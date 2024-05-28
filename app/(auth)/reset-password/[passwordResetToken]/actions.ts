'use server';

import { resetPasswordFormSchema } from '@/lib/zod';
import { encodeHex } from 'oslo/encoding';
import { sha256 } from 'oslo/crypto';
import { passwordResetTokenTable, userTable } from '@/db/schema';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { lucia } from '@/lib/lucia';
import { argon2id, createSession } from '@/lib/server-utils';
import { getErrorMessage } from '@/lib/utils';

export async function resetPasswordAction(formData: unknown, token: string) {
	// Validate formData
	const validatedFormData = resetPasswordFormSchema.safeParse(formData);
	if (!validatedFormData.success) {
		return {
			error: 'Invalid data'
		};
	}

	const { password } = validatedFormData.data;

	try {
		const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));
		const databaseToken = await db.query.passwordResetTokenTable.findFirst({
			where: eq(passwordResetTokenTable.tokenHash, tokenHash)
		});

		if (databaseToken) {
			// Todo check if new password is same as prev, if so return error that password can't be the same

			// Delete token
			await db
				.delete(passwordResetTokenTable)
				.where(eq(passwordResetTokenTable.userId, databaseToken.userId));

			// Invalidate all previous sessions
			await lucia.invalidateUserSessions(databaseToken.userId);

			// hash password
			const hashedPassword = await argon2id.hash(password);
			// update password & set email verified
			await db
				.update(userTable)
				.set({ hashedPassword, emailVerified: true })
				.where(eq(userTable.id, databaseToken.userId));

			// create session
			await createSession(databaseToken.userId);
		}

		return {
			success: 'Password updated successfully'
		};
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error)
		};
	}
}
