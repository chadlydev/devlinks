import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
	id: text('id').primaryKey(),
	email: text('email').unique(),
	hashedPassword: text('hashed_password'),
	emailVerified: boolean('email_verified').notNull().default(false),
	profilePictureUrl: text('profile_picture_url'),
	name: text('name'),
	displayEmail: text('display_email'),
	url: text('url').unique(),
	subscription: text('subscription').notNull().default('free')
});

export const oauthAccountTable = pgTable('oauth_account', {
	providerUserId: text('provider_user_id').primaryKey(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	accessToken: text('access_token').notNull(),
	refreshToken: text('refresh_token'),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	})
});

export const emailVerificationTable = pgTable('email_verification', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	email: text('email').notNull(),
	code: text('code').notNull(),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const passwordResetTokenTable = pgTable('password_reset_token', {
	tokenHash: text('token_hash').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const sessionTable = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const linkTable = pgTable('link', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	platform: text('platform').notNull(),
	url: text('url').notNull()
});
