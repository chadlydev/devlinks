'use server';

import { loginFormSchema } from '@/lib/zod';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { userTable } from '@/db/schema';
import { argon2id, createSession } from '@/lib/server-utils';

export async function loginAction(formData: unknown) {
	// validate data on the server side
	const validatedFormData = loginFormSchema.safeParse(formData);

	if (!validatedFormData.success) {
		return {
			message: 'Invalid data'
		};
	}

	// Extract values
	const { email, password } = validatedFormData.data;

	try {
		// Check for existing user
		const existingUser = await db.query.userTable.findFirst({
			where: eq(userTable.email, email)
		});

		// Nothing found? return
		if (!existingUser) {
			return {
				error: 'Incorrect email or password.'
			};
		}

		// Is there a password?
		if (!existingUser.hashedPassword) {
			return {
				error: 'Incorrect email or password.'
			};
		}

		// Check password
		const isValidPassword = await argon2id.verify(existingUser.hashedPassword, password);

		// Incorrect? return
		if (!isValidPassword) {
			return {
				error: 'Incorrect email or password.'
			};
		}

		await createSession(existingUser.id);

		return {
			success: 'Successfully logged in!'
		};
	} catch {
		return {
			error: 'Something went wrong'
		};
	}
}
