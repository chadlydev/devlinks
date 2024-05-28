'use server';

import { invalidateUserSessions, validateRequest } from '@/lib/server-utils';
import { getErrorMessage } from '@/lib/utils';

export async function logoutAction() {
	try {
		const { user } = await validateRequest();
		if (!user) {
			return {
				error: 'Unauthorized'
			};
		}

		await invalidateUserSessions(user.id);

		return {
			success: 'Successfully logged out!'
		};
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error)
		};
	}
}
