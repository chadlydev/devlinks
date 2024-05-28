'use server';

import { signUpFormSchema } from '@/lib/zod';
import { generateId } from 'lucia';
import { argon2id, createSession } from '@/lib/server-utils';
import { db } from '@/db';
import { userTable } from '@/db/schema';

export async function signUpAction(formData: unknown) {
	// Validate formData
	const validatedFormData = signUpFormSchema.safeParse(formData);
	if (!validatedFormData.success) {
		return {
			error: 'Invalid data'
		};
	}

	// Create user object
	const user = {
		id: generateId(16),
		email: validatedFormData.data.email,
		hashedPassword: await argon2id.hash(validatedFormData.data.password),
		emailVerified: false
	};

	try {
		// Add new user to db
		await db.insert(userTable).values(user);

		// create a session
		await createSession(user.id);

		return {
			success: 'Account successfully created!'
		};
	} catch (error) {
		return {
			error: 'This email address is already in use. Please provide a different email address.'
		};
	}
}
