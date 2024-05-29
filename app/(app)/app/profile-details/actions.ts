'use server';

import { validateRequest } from '@/lib/server-utils';
import { getErrorMessage } from '@/lib/utils';
import { profileDetailsFormSchema } from '@/lib/zod';
import { db } from '@/db';
import { userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function updateProfileDetailsAction(formData: unknown) {
	const validatedFormData = profileDetailsFormSchema.safeParse(formData);
	if (!validatedFormData.success) {
		return {
			error: 'Invalid data'
		};
	}

	const { name, displayEmail } = validatedFormData.data;

	try {
		const { user } = await validateRequest();
		if (!user) {
			return {
				error: 'Unauthorized'
			};
		}

		// Update user
		await db
			.update(userTable)
			.set({
				name,
				displayEmail
			})
			.where(eq(userTable.id, user.id));

		return {
			success: 'Successfully updated profile details!'
		};
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error)
		};
	}
}
