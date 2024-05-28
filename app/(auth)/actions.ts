'use server';

import { createEmailVerificationCode, validateRequest } from '@/lib/server-utils';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { emailVerificationTable } from '@/db/schema';
import { getErrorMessage, minutesToMs } from '@/lib/utils';
import {
	EMAIL_VERIFICATION_EXPIRES_IN,
	EMAIL_VERIFICATION_TIMER_MS,
	GITHUB_OAUTH_STATE_COOKIES,
	GOOGLE_OAUTH_CODE_VERIFIER_COOKIES,
	GOOGLE_OAUTH_STATE_COOKIES
} from '@/lib/constants';
import { resend } from '@/emails';
import EmailVerification from '@/emails/email-verification';
import { generateCodeVerifier, generateState } from 'oslo/oauth2';
import { cookies } from 'next/headers';
import { github, google } from '@/lib/oauth';

export async function sendEmailVerificationAction() {
	try {
		// First have to check if the user is allowed to send a (new) verification email
		const { user } = await validateRequest();
		if (!user) {
			return {
				error: 'No user found'
			};
		}

		// extract data
		const { email, id } = user;

		const existingEmailVerification = await db.query.emailVerificationTable.findFirst({
			where: eq(emailVerificationTable.email, email)
		});

		if (existingEmailVerification) {
			const createdAt =
				existingEmailVerification.expiresAt.getTime() - minutesToMs(EMAIL_VERIFICATION_EXPIRES_IN);

			if (createdAt > Date.now() - EMAIL_VERIFICATION_TIMER_MS) {
				return {
					error: 'Please wait before requesting another email verification code'
				};
			}
		}

		// Generate code & send code
		const verificationCode = await createEmailVerificationCode(id, email);
		await resend.emails.send({
			from: `no-reply@${process.env.RESEND_DOMAIN}`,
			to: [email],
			subject: `Email Verification Code: ${verificationCode}`,
			react: EmailVerification({ email: email, code: verificationCode })
		});

		return {
			success: 'Verification code sent'
		};
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error)
		};
	}
}

export async function createGithubAuthorizationUrlAction() {
	try {
		const state = generateState();

		cookies().set(GITHUB_OAUTH_STATE_COOKIES, state, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production'
		});

		const authorizationURL = await github.createAuthorizationURL(state, {
			scopes: ['user:email']
		});

		return {
			success: true,
			data: authorizationURL.toString()
		};
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error)
		};
	}
}

export async function createGoogleAuthorizationUrlAction() {
	try {
		const state = generateState();
		const codeVerifier = generateCodeVerifier();

		cookies().set(GOOGLE_OAUTH_CODE_VERIFIER_COOKIES, codeVerifier, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production'
		});

		cookies().set(GOOGLE_OAUTH_STATE_COOKIES, state, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production'
		});

		const authorizationURL = await google.createAuthorizationURL(state, codeVerifier, {
			scopes: ['email', 'profile']
		});

		return {
			success: true,
			data: authorizationURL.toString()
		};
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error)
		};
	}
}
