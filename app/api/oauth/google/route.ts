import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/db';
import { and, eq } from 'drizzle-orm';
import {
	GOOGLE_OAUTH_API_URL,
	GOOGLE_OAUTH_CODE_VERIFIER_COOKIES,
	GOOGLE_OAUTH_STATE_COOKIES,
	ROUTE_LINKS
} from '@/lib/constants';
import { OAuth2RequestError } from 'arctic';
import { getErrorMessage } from '@/lib/utils';
import { generateId } from 'lucia';
import { google } from '@/lib/oauth';
import { oauthAccountTable, userTable } from '@/db/schema';
import { createSession } from '@/lib/server-utils';

type GoogleUser = {
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	picture: string;
	locale: string;
};

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const storedCodeVerifier = cookies().get(GOOGLE_OAUTH_CODE_VERIFIER_COOKIES)?.value ?? null;
	const storedState = cookies().get(GOOGLE_OAUTH_STATE_COOKIES)?.value ?? null;

	if (!code || !state || !storedState || !storedCodeVerifier || storedState !== state) {
		return Response.json({ error: 'Invalid url' }, { status: 400 });
	}

	try {
		const { accessToken, accessTokenExpiresAt, refreshToken } =
			await google.validateAuthorizationCode(code, storedCodeVerifier);

		const googleUserResponse = await fetch(GOOGLE_OAUTH_API_URL, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			},
			method: 'GET'
		});

		const googleUser = (await googleUserResponse.json()) as GoogleUser;

		// Check existing User
		const existingUser = await db.query.userTable.findFirst({
			where: eq(userTable.email, googleUser.email)
		});

		// Is there already an account?
		const existingAccount = await db.query.oauthAccountTable.findFirst({
			where: and(
				eq(oauthAccountTable.providerId, 'google'),
				eq(oauthAccountTable.providerUserId, googleUser.id)
			)
		});

		if (!existingUser) {
			const userId = generateId(16);

			await db.transaction(async (trx) => {
				const createdUserResponse = await trx
					.insert(userTable)
					.values({
						id: userId,
						email: googleUser.email,
						name: googleUser.name,
						profilePictureUrl: googleUser.picture,
						emailVerified: true
					})
					.returning({
						id: userTable.id
					});

				if (createdUserResponse.length === 0) {
					trx.rollback();
					return Response.json({ error: 'Failed to create user.' }, { status: 500 });
				}

				const createdAccountResponse = await trx.insert(oauthAccountTable).values({
					userId,
					providerId: 'google',
					providerUserId: googleUser.id,
					accessToken,
					refreshToken,
					expiresAt: accessTokenExpiresAt
				});

				if (createdAccountResponse.rowCount === 0) {
					trx.rollback();
					return Response.json({ error: 'Failed to create oauth account.' }, { status: 500 });
				}
			});

			await createSession(userId);

			// Clean up cookies (state & codeVerifier)
			cookies().set(GOOGLE_OAUTH_STATE_COOKIES, '', { expires: new Date(0) });
			cookies().set(GOOGLE_OAUTH_CODE_VERIFIER_COOKIES, '', { expires: new Date(0) });

			return NextResponse.redirect(new URL(ROUTE_LINKS, process.env.NEXT_PUBLIC_APP_URL), {
				status: 302
			});
		} else if (existingUser && !existingAccount) {
			// verify email if this was not the case yet
			await db
				.update(userTable)
				.set({ emailVerified: true })
				.where(eq(userTable.id, existingUser.id));

			await db.insert(oauthAccountTable).values({
				userId: existingUser.id,
				providerId: 'google',
				providerUserId: googleUser.id,
				accessToken,
				refreshToken,
				expiresAt: accessTokenExpiresAt
			});

			// create a session, cleanup and redirect
			await createSession(existingUser.id);
			cookies().set(GOOGLE_OAUTH_STATE_COOKIES, '', { expires: new Date(0) });
			cookies().set(GOOGLE_OAUTH_CODE_VERIFIER_COOKIES, '', { expires: new Date(0) });

			return NextResponse.redirect(new URL(ROUTE_LINKS, process.env.NEXT_PUBLIC_APP_URL), {
				status: 302
			});
		}

		// If there is a user & account, update the account
		await db
			.update(oauthAccountTable)
			.set({
				accessToken,
				refreshToken,
				expiresAt: accessTokenExpiresAt
			})
			.where(
				and(
					eq(oauthAccountTable.providerId, 'google'),
					eq(oauthAccountTable.providerUserId, googleUser.id)
				)
			);

		// create a session, cleanup and redirect
		await createSession(existingUser.id);
		cookies().set(GOOGLE_OAUTH_STATE_COOKIES, '', { expires: new Date(0) });
		cookies().set(GOOGLE_OAUTH_CODE_VERIFIER_COOKIES, '', { expires: new Date(0) });

		return NextResponse.redirect(new URL(ROUTE_LINKS, process.env.NEXT_PUBLIC_APP_URL), {
			status: 302
		});
	} catch (error: unknown) {
		// the specific error message depends on the provider
		if (error instanceof OAuth2RequestError) {
			// invalid code
			return Response.json(
				{ error: getErrorMessage(error) },
				{
					status: 400
				}
			);
		}

		return Response.json({ error: getErrorMessage(error) }, { status: 500 });
	}
}
