'use server';

import { argon2id, invalidateUserSessions, validateRequest } from '@/lib/server-utils';
import { getErrorMessage } from '@/lib/utils';
import { changePasswordFormSchema } from '@/lib/zod';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { userTable } from '@/db/schema';

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
