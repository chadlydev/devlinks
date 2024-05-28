'use server';

import { createEmailVerificationCode, validateRequest } from '@/lib/server-utils';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { emailVerificationTable } from '@/db/schema';
import { getErrorMessage, minutesToMs } from '@/lib/utils';
import { EMAIL_VERIFICATION_EXPIRES_IN, EMAIL_VERIFICATION_TIMER_MS } from '@/lib/constants';
import { resend } from '@/emails';
import EmailVerification from '@/emails/email-verification';

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
