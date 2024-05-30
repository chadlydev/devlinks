'use server';

import { validateRequest } from '@/lib/server-utils';
import { getErrorMessage } from '@/lib/utils';
import { profileDetailsFormSchema } from '@/lib/zod';
import { db } from '@/db';
import { userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { alphabet, generateRandomString } from 'oslo/crypto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '@/lib/s3';

const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const maxFileSize = 1024 * 1024 * 10;

export async function getS3SignedUrlAction(type: string, size: number, checksum: string) {
	// Check for authenticated user
	const session = await validateRequest();
	if (!session.user) {
		return {
			error: 'Not authenticated'
		};
	}

	// Check correct file type
	if (!acceptedTypes.includes(type)) {
		return {
			error: 'Invalid file type'
		};
	}

	// Check correct file size
	if (size > maxFileSize) {
		return {
			error: 'File too large'
		};
	}

	const putObjectCommand = new PutObjectCommand({
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: generateRandomString(32, alphabet('a-z', '0-9')),
		ContentType: type,
		ContentLength: size,
		ChecksumSHA256: checksum,
		Metadata: {
			userId: session.user.id
		}
	});

	const signedUrl = await getSignedUrl(s3, putObjectCommand, {
		expiresIn: 60
	});

	// update profile picture
	await db
		.update(userTable)
		.set({
			profilePictureUrl: signedUrl.split('?')[0]
		})
		.where(eq(userTable.id, session.user.id));

	return {
		success: {
			url: signedUrl
		}
	};
}

export async function updateProfileDetailsAction(formData: unknown) {
	const validatedFormData = profileDetailsFormSchema.safeParse(formData);
	if (!validatedFormData.success) {
		return {
			error: 'Invalid data'
		};
	}

	const { name, displayEmail, url } = validatedFormData.data;

	try {
		const { user } = await validateRequest();
		if (!user) {
			return {
				error: 'Unauthorized'
			};
		}

		// Check if there is url value
		if (url) {
			// check if the url is unchanged
			if (url !== user.url) {
				// Check if the url is available
				const existingUser = await db.query.userTable.findFirst({ where: eq(userTable.url, url) });
				if (existingUser) {
					return {
						error: 'URL is already taken, please choose a different one',
						type: 'url-not-available'
					};
				}
			}
		}

		// Update user
		await db
			.update(userTable)
			.set({
				name,
				displayEmail,
				url
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
