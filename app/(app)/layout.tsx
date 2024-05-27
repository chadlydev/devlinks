import React from 'react';
import ProfileContextProvider from '@/contexts/profile-context';

export default async function Layout({ children }: { children: React.ReactNode }) {
	const data = {
		user: {
			name: '',
			email: '',
			profilePictureUrl: ''
		},
		links: []
	};

	return <ProfileContextProvider data={data}>{children}</ProfileContextProvider>;
}
