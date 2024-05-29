import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/db';
import { and, eq } from 'drizzle-orm';
import { GITHUB_OAUTH_API_URL, GITHUB_OAUTH_STATE_COOKIES, ROUTE_LINKS } from '@/lib/constants';
import { OAuth2RequestError } from 'arctic';
import { getErrorMessage } from '@/lib/utils';
import { generateId } from 'lucia';
import { github } from '@/lib/oauth';
import { oauthAccountTable, userTable } from '@/db/schema';
import { createSession } from '@/lib/server-utils';

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const storedState = cookies().get(GITHUB_OAUTH_STATE_COOKIES)?.value ?? null;
	if (!code || !state || !storedState || storedState !== state) {
		return Response.json({ error: 'Invalid url' }, { status: 400 });
	}

	try {
		const { accessToken } = await github.validateAuthorizationCode(code);

		const githubUserResponse = await fetch(GITHUB_OAUTH_API_URL, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			},
			method: 'GET'
		});

		const githubUser = await githubUserResponse.json();

		const userId = generateId(16);

		const existingUserByEmail = await db.query.userTable.findFirst({
			where: eq(userTable.email, githubUser.email)
		});

		const existingAccount = await db.query.oauthAccountTable.findFirst({
			where: and(
				eq(oauthAccountTable.providerId, 'github'),
				eq(oauthAccountTable.providerUserId, githubUser.id)
			)
		});

		if (!existingUserByEmail) {
			if (!existingAccount) {
				await db.transaction(async (trx) => {
					// Create user
					const createdUserResponse = await trx
						.insert(userTable)
						.values({
							id: userId,
							email: githubUser.email,
							displayEmail: githubUser.email,
							name: githubUser.name,
							profilePictureUrl: githubUser.avatar_url,
							emailVerified: true
						})
						.returning({
							id: userTable.id
						});

					if (createdUserResponse.length === 0) {
						trx.rollback();
						return Response.json({ error: 'Failed to create user.' }, { status: 500 });
					}

					// Create Account
					const createdAccountResponse = await trx.insert(oauthAccountTable).values({
						userId,
						providerId: 'github',
						providerUserId: githubUser.id,
						accessToken
					});

					if (createdAccountResponse.rowCount === 0) {
						trx.rollback();
						return Response.json({ error: 'Failed to create oauth account.' }, { status: 500 });
					}
				});

				await createSession(userId);

				// Clean up cookies (state & codeVerifier)
				cookies().set(GITHUB_OAUTH_STATE_COOKIES, '', { expires: new Date(0) });

				return NextResponse.redirect(new URL(ROUTE_LINKS, process.env.NEXT_PUBLIC_APP_URL), {
					status: 302
				});
			}

			const updatedAccountResponse = await db
				.update(oauthAccountTable)
				.set({
					accessToken
				})
				.where(
					and(
						eq(oauthAccountTable.providerId, 'github'),
						eq(oauthAccountTable.providerUserId, githubUser.id)
					)
				);

			if (updatedAccountResponse.rowCount === 0) {
				return Response.json({ error: 'Failed to update oauth account.' }, { status: 500 });
			}

			await createSession(existingAccount.userId);

			// Clean up cookies (state & codeVerifier)
			cookies().set(GITHUB_OAUTH_STATE_COOKIES, '', { expires: new Date(0) });

			return NextResponse.redirect(new URL(ROUTE_LINKS, process.env.NEXT_PUBLIC_APP_URL), {
				status: 302
			});
		}

		if (!existingAccount) {
			await db.transaction(async (trx) => {
				// Create Account
				const createdAccountResponse = await trx.insert(oauthAccountTable).values({
					userId: existingUserByEmail.id,
					providerId: 'github',
					providerUserId: githubUser.id,
					accessToken
				});

				if (createdAccountResponse.rowCount === 0) {
					trx.rollback();
					return Response.json({ error: 'Failed to create oauth account.' }, { status: 500 });
				}

				// Update email verified
				const updatedUserResponse = await trx
					.update(userTable)
					.set({
						emailVerified: true
					})
					.where(eq(userTable.id, existingUserByEmail.id));

				if (updatedUserResponse.rowCount === 0) {
					trx.rollback();
					return Response.json({ error: 'Failed to update user.' }, { status: 500 });
				}
			});

			await createSession(existingUserByEmail.id);

			// Clean up cookies (state & codeVerifier)
			cookies().set(GITHUB_OAUTH_STATE_COOKIES, '', { expires: new Date(0) });

			return NextResponse.redirect(new URL(ROUTE_LINKS, process.env.NEXT_PUBLIC_APP_URL), {
				status: 302
			});
		}

		const updatedAccountResponse = await db
			.update(oauthAccountTable)
			.set({
				accessToken
			})
			.where(
				and(
					eq(oauthAccountTable.providerId, 'github'),
					eq(oauthAccountTable.providerUserId, githubUser.id)
				)
			);

		if (updatedAccountResponse.rowCount === 0) {
			return Response.json({ error: 'Failed to update oauth account.' }, { status: 500 });
		}

		await createSession(existingAccount.userId);

		// Clean up cookies (state & codeVerifier)
		cookies().set(GITHUB_OAUTH_STATE_COOKIES, '', { expires: new Date(0) });

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
