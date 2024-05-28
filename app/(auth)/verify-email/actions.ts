'use server';

import { verifyEmailFormSchema } from '@/lib/zod';
import { createSession, validateRequest, verifyEmailVerificationCode } from '@/lib/server-utils';
import { lucia } from '@/lib/lucia';
import { db } from '@/db';
import { userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { ROUTE_VERIFY_EMAIL } from '@/lib/constants';

export async function verifyEmailAction(formData: unknown) {
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

		// Find the email verification in db and check if the code is correct
		const validCode = await verifyEmailVerificationCode(user, code);
		if (!validCode) {
			return {
				error: 'Invalid verification code.'
			};
		}

		// Invalidate all sessions
		await lucia.invalidateUserSessions(user.id);
		// Set email verified to true
		await db
			.update(userTable)
			.set({
				emailVerified: true
			})
			.where(eq(userTable.id, user.id));
		//  Create new session
		await createSession(user.id);

		// Revalidate path
		revalidatePath(ROUTE_VERIFY_EMAIL, 'layout');

		return {
			success: 'Email successfully verified'
		};
	} catch {
		return {
			error:
				"The provided verification code is invalid. Please re-check and retry. If it's still not working, get-started a new code."
		};
	}
}
