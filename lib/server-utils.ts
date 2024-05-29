import 'server-only';
import { Argon2id } from 'oslo/password';
import type { TUser } from '@/lib/types';
import { lucia } from '@/lib/lucia';
import {
	EMAIL_VERIFICATION_EXPIRES_IN,
	RESET_PASSWORD_TOKEN_EXPIRES_IN,
	SESSION_EXPIRES_IN
} from '@/lib/constants';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { db } from '@/db';
import { emailVerificationTable, passwordResetTokenTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { alphabet, generateRandomString, sha256 } from 'oslo/crypto';
import { generateId } from 'lucia';
import { createDate, isWithinExpirationDate, TimeSpan } from 'oslo';
import { encodeHex } from 'oslo/encoding';

export const argon2id = new Argon2id();

/*------------------------------------------------------------------------------
--- Auth
----------------------------------------------------------------------------- */
export async function createSession(userId: TUser['id']) {
	await lucia.invalidateUserSessions(userId);

	const session = await lucia.createSession(userId, {
		expiresIn: SESSION_EXPIRES_IN
	});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export async function invalidateUserSessions(userId: TUser['id']) {
	await lucia.invalidateUserSessions(userId);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export const validateRequest = cache(async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

	if (!sessionId) {
		return {
			user: null,
			session: null
		};
	}

	const { user, session } = await lucia.validateSession(sessionId);

	try {
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
	} catch {
		// Next.js throws error when attempting to set cookies when rendering page
	}

	return {
		user,
		session
	};
});

/*------------------------------------------------------------------------------
--- Email Verification
----------------------------------------------------------------------------- */
export async function createEmailVerificationCode(userId: string, email: string) {
	await db.delete(emailVerificationTable).where(eq(emailVerificationTable.userId, userId));
	const code = generateRandomString(8, alphabet('0-9'));
	await db.insert(emailVerificationTable).values({
		code,
		userId,
		email,
		id: generateId(16),
		expiresAt: createDate(new TimeSpan(EMAIL_VERIFICATION_EXPIRES_IN, 'm'))
	});

	return code;
}

export async function verifyEmailVerificationCode(
	user: Omit<TUser, 'hashedPassword' | 'name' | 'profilePictureUrl' | 'displayEmail'>,
	code: string
) {
	const databaseCode = await db.query.emailVerificationTable.findFirst({
		where: eq(emailVerificationTable.userId, user.id)
	});

	if (!databaseCode || databaseCode.code !== code) {
		return false;
	}

	await db.delete(emailVerificationTable).where(eq(emailVerificationTable.id, databaseCode.id));

	if (!isWithinExpirationDate(databaseCode.expiresAt)) {
		return false;
	}

	if (databaseCode.email !== user.email) {
		return false;
	}

	return true;
}

/*------------------------------------------------------------------------------
--- Reset Password
----------------------------------------------------------------------------- */
export async function createPasswordResetToken(userId: string) {
	// Invalidate all existing tokens
	await db.delete(passwordResetTokenTable).where(eq(passwordResetTokenTable.userId, userId));

	// Generate & hash token
	const tokenId = generateId(48);
	const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));

	// Add password reset token
	await db.insert(passwordResetTokenTable).values({
		tokenHash,
		userId,
		expiresAt: createDate(new TimeSpan(RESET_PASSWORD_TOKEN_EXPIRES_IN, 'm'))
	});

	return tokenId;
}
