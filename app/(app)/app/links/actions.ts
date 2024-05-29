'use server';

import { validateRequest } from '@/lib/server-utils';
import { getErrorMessage } from '@/lib/utils';
import { linksFormSchema } from '@/lib/zod';
import { db } from '@/db';
import { linkTable } from '@/db/schema';
import { generateId } from 'lucia';
import { eq } from 'drizzle-orm';

export async function updateLinksAction(formData: unknown) {
	// Validate formData
	const validatedFormData = linksFormSchema.safeParse(formData);
	if (!validatedFormData.success) {
		return {
			error: 'Invalid data'
		};
	}

	const { links } = validatedFormData.data;

	try {
		const { user } = await validateRequest();
		if (!user) {
			return {
				error: 'Unauthorized'
			};
		}

		// Delete all links first
		await db.delete(linkTable).where(eq(linkTable.userId, user.id));

		// Add all links
		for (const link of links) {
			const id = generateId(16);
			await db
				.insert(linkTable)
				.values({ id, userId: user.id, url: link.url, platform: link.platform });
		}

		return {
			success: 'Successfully updated links!'
		};
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error)
		};
	}
}
