'use server';

import { emailFormSchema } from '@/lib/zod';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { passwordResetTokenTable, userTable } from '@/db/schema';
import { getErrorMessage, minutesToMs } from '@/lib/utils';
import { RESET_PASSWORD_TIMER_MS, RESET_PASSWORD_TOKEN_EXPIRES_IN, ROUTE_RESET_PASSWORD } from '@/lib/constants';
import { resend } from '@/emails';
import { createPasswordResetToken } from '@/lib/server-utils';
import PasswordReset from '@/emails/password-reset';

export async function requestPasswordResetAction(formData: unknown) {
	// Validate formData
	const validatedFormData = emailFormSchema.safeParse(formData);
	if (!validatedFormData.success) {
		return {
			error: 'Invalid data'
		};
	}

	const { email } = validatedFormData.data;

	try {
		// First check if there is a user with the given email
		const existingUser = await db.query.userTable.findFirst({
			where: eq(userTable.email, email)
		});
		if (!existingUser) {
			return {
				success:
					'If an account exists with the provided email, you will receive further instructions.'
			};
		}

		// Is there an existing password reset token ??
		const existingResetToken = await db.query.passwordResetTokenTable.findFirst({
			where: eq(passwordResetTokenTable.userId, existingUser.id)
		});

		// If yes, check the expiry
		if (existingResetToken) {
			const createdAt =
				existingResetToken.expiresAt.getTime() - minutesToMs(RESET_PASSWORD_TOKEN_EXPIRES_IN);

			// if its sent under 5 min ago return error
			if (createdAt > Date.now() - RESET_PASSWORD_TIMER_MS) {
				return {
					error: 'Please wait before requesting another password reset'
				};
			}
		}

		// create token
		const verificationToken = await createPasswordResetToken(existingUser.id);
		const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}${ROUTE_RESET_PASSWORD}/${verificationToken}`;

		// send email
		await resend.emails.send({
			from: `no-reply@${process.env.RESEND_DOMAIN}`,
			to: [email],
			subject: 'Reset your password',
			react: PasswordReset({ email, url: verificationLink })
		});

		return {
			success:
				'If an account exists with the provided email, you will receive further instructions.'
		};
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error)
		};
	}
}
