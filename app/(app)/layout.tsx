import React from 'react';
import ProfileContextProvider from '@/contexts/profile-context';
import { validateRequest } from '@/lib/server-utils';

export default async function Layout({ children }: { children: React.ReactNode }) {
	const { user } = await validateRequest();

	let data = {
		user: {
			name: '',
			email: '',
			profilePictureUrl: ''
		},
		links: []
	};

	if (user) {
		data = {
			user: {
				name: user.name === null ? '' : user.name,
				email: user.email === null ? '' : user.email,
				profilePictureUrl: user.profilePictureUrl === null ? '' : user.profilePictureUrl
			},
			links: []
		};
	}

	return <ProfileContextProvider data={data}>{children}</ProfileContextProvider>;
}
