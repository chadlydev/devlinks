'use server';

import { getErrorMessage } from '@/lib/utils';
import { emailFormSchema } from '@/lib/zod';
import { db } from '@/db';
import { emailVerificationTable, passwordResetTokenTable, userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { ROUTE_GET_STARTED } from '@/lib/constants';
import { invalidateUserSessions, validateRequest } from '@/lib/server-utils';

export async function requestEmailChangeAction(formData: unknown, currentEmail: string) {
	// Validate formData
	const validatedFormData = emailFormSchema.safeParse(formData);
	if (!validatedFormData.success) {
		return {
			error: 'Invalid data'
		};
	}

	const { email } = validatedFormData.data;

	try {
		// Is there already a user with the new email address?
		const existingUser = await db.query.userTable.findFirst({
			where: eq(userTable.email, email)
		});
		if (existingUser) {
			return {
				error:
					'The email address you entered is already in use. Please enter a different email address.'
			};
		}

		await db
			.update(userTable)
			.set({
				email
			})
			.where(eq(userTable.email, currentEmail));

		revalidatePath(ROUTE_GET_STARTED, 'layout');

		return {
			success: 'Email successfully changed'
		};
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error)
		};
	}
}

export async function cancelSignUpAction() {
	try {
		const { user } = await validateRequest();
		if (!user) {
			return {
				error: 'Unauthorized'
			};
		}

		// Delete session
		await invalidateUserSessions(user.id);

		// Delete user, email verifications, password reset, etc....
		await db.delete(emailVerificationTable).where(eq(emailVerificationTable.userId, user.id));
		await db.delete(passwordResetTokenTable).where(eq(passwordResetTokenTable.userId, user.id));
		await db.delete(userTable).where(eq(userTable.id, user.id));

		return {
			success:
				"Your registration process has been cancelled. We've removed your information from our system."
		};
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error)
		};
	}
}
