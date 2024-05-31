'use server';

import {
	argon2id,
	createEmailVerificationCode,
	invalidateUserSessions,
	validateRequest
} from '@/lib/server-utils';
import { getErrorMessage, minutesToMs } from '@/lib/utils';
import { changeEmailFormSchema, changePasswordFormSchema, verifyEmailFormSchema } from '@/lib/zod';
import { eq, or } from 'drizzle-orm';
import { db } from '@/db';
import { emailVerificationTable, userTable } from '@/db/schema';
import {
	EMAIL_VERIFICATION_EXPIRES_IN,
	EMAIL_VERIFICATION_TIMER_MS,
	ROUTE_PROFILE_DETAILS
} from '@/lib/constants';
import { resend } from '@/emails';
import EmailVerification from '@/emails/email-verification';
import { isWithinExpirationDate } from 'oslo';
import { redirect } from 'next/navigation';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function logoutAction() {
	try {
		const { user } = await validateRequest();
		if (!user) {
			return {
				error: 'Unauthorized'
			};
		}

		await invalidateUserSessions(user.id);

		return {
			success: 'Successfully logged out!'
		};
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error)
		};
	}
}

export async function changePasswordAction(formData: unknown) {
	// Validate formData
	const validatedFormData = changePasswordFormSchema.safeParse(formData);
	if (!validatedFormData.success) {
		return {
			error: 'Invalid data'
		};
	}

	const { currentPassword, newPassword } = validatedFormData.data;

	const { user } = await validateRequest();

	if (!user) {
		return {
			error: 'Not authenticated'
		};
	}

	try {
		// 	check current password
		const currentUser = await db.query.userTable.findFirst({ where: eq(userTable.id, user.id) });
		if (!currentUser) {
			return {
				error: 'No user found'
			};
		}

		const validPassword = await argon2id.verify(currentUser.hashedPassword!, currentPassword);

		if (!validPassword) {
			return {
				error: 'Invalid password'
			};
		}

		// change password
		const newHashedPassword = await argon2id.hash(newPassword);

		await db
			.update(userTable)
			.set({ hashedPassword: newHashedPassword })
			.where(eq(userTable.id, currentUser.id));

		return {
			success: 'Password changed successfully'
		};
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error)
		};
	}
}

export async function requestEmailChangeAction(formData: unknown) {
	// Validate formData
	const validatedFormData = changeEmailFormSchema.safeParse(formData);
	if (!validatedFormData.success) {
		return {
			error: 'Invalid data'
		};
	}

	const { password, email } = validatedFormData.data;

	const { user } = await validateRequest();

	if (!user) {
		return {
			error: 'Not authenticated'
		};
	}

	try {
		// 	check current password
		const currentUser = await db.query.userTable.findFirst({ where: eq(userTable.id, user.id) });
		if (!currentUser) {
			return {
				error: 'No user found'
			};
		}

		const validPassword = await argon2id.verify(currentUser.hashedPassword!, password);

		if (!validPassword) {
			return {
				error: 'Invalid password',
				type: 'invalid-password'
			};
		}

		// check if email is available
		const emailAlreadyTaken = await db.query.userTable.findFirst({
			where: eq(userTable.email, email)
		});
		if (emailAlreadyTaken) {
			return {
				error: 'Email is already taken, please choose a different one',
				type: 'email-not-available'
			};
		}

		// Check for existing email change token, if there is one, check the timer
		const existingEmailVerification = await db.query.emailVerificationTable.findFirst({
			where: or(eq(emailVerificationTable.email, email), eq(emailVerificationTable.userId, user.id))
		});

		if (existingEmailVerification) {
			const createdAt =
				existingEmailVerification.expiresAt.getTime() - minutesToMs(EMAIL_VERIFICATION_EXPIRES_IN);

			if (createdAt > Date.now() - EMAIL_VERIFICATION_TIMER_MS) {
				return {
					error: 'Please wait before requesting another email change code'
				};
			}
		}

		// Delete any existing email change tokens
		await db
			.delete(emailVerificationTable)
			.where(
				or(eq(emailVerificationTable.email, email), eq(emailVerificationTable.userId, user.id))
			);

		// send email to new email address
		const verificationCode = await createEmailVerificationCode(user.id, email);
		await resend.emails.send({
			from: `no-reply@${process.env.RESEND_DOMAIN}`,
			to: [email],
			subject: `Email Verification Code: ${verificationCode}`,
			react: EmailVerification({ email: email, code: verificationCode })
		});

		return {
			success: 'Please check your inbox to verify your new email address'
		};
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error)
		};
	}
}

export async function verifyEmailChangeAction(formData: unknown) {
	// validate formData
	const validatedFormData = verifyEmailFormSchema.safeParse(formData);
	if (!validatedFormData.success) {
		return {
			error: 'Invalid data.'
		};
	}

	// Extract code from validatedFormData
	const { code } = validatedFormData.data;

	try {
		// Get current user details
		const { user } = await validateRequest();
		if (!user) {
			return {
				error: 'No user signed in'
			};
		}

		const databaseCode = await db.query.emailVerificationTable.findFirst({
			where: eq(emailVerificationTable.userId, user.id)
		});

		if (!databaseCode || databaseCode.code !== code) {
			return {
				error: 'Invalid verification code.'
			};
		}

		await db.delete(emailVerificationTable).where(eq(emailVerificationTable.id, databaseCode.id));

		if (!isWithinExpirationDate(databaseCode.expiresAt)) {
			return {
				error: 'Verification code is expired. Please try again.'
			};
		}

		// Notify old email address that the email has been changed
		await resend.emails.send({
			from: `no-reply@${process.env.RESEND_DOMAIN}`,
			to: [user.email],
			subject: `Email address change notification`,
			text: `Your email address has been changed to ${databaseCode.email}`
		});

		// change email
		await db.update(userTable).set({ email: databaseCode.email }).where(eq(userTable.id, user.id));

		return {
			success: 'Email successfully changed'
		};
	} catch {
		return {
			error:
				"The provided verification code is invalid. Please re-check and retry. If it's still not working, get-started a new code."
		};
	}
}

export async function createCheckoutSessionAction() {
	const { user } = await validateRequest();
	if (!user) {
		return {
			error: 'Not authorized'
		};
	}

	const checkoutSession = await stripe.checkout.sessions.create({
		customer_email: user.email ? user.email : undefined,
		client_reference_id: user.id,
		line_items: [
			{
				price: 'price_1PM7hTBd2AZ2TcCm9bOrRKNi',
				quantity: 1
			}
		],
		mode: 'payment',
		success_url: `${process.env.NEXT_PUBLIC_APP_URL}${ROUTE_PROFILE_DETAILS}?payment_success=true`,
		cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}${ROUTE_PROFILE_DETAILS}?payment_cancelled=true`
	});

	// redirect user
	redirect(checkoutSession.url);
}
