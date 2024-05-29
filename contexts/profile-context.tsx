'use client';

import React, { createContext, useContext, useState } from 'react';
import { TLink, TUser } from '@/lib/types';

type Data = {
	user: Omit<TUser, 'hashedPassword' | 'emailVerified' | 'id'>;
	links: TLink[];
};

type ProfileContextProviderProps = {
	data: Data;
	children: React.ReactNode;
};

type TProfileContext = {
	user: Omit<TUser, 'hashedPassword' | 'emailVerified' | 'id'>;
	links: TLink[];
	handleChangeLinks: (links: TLink[]) => void;
	handleChangeUserProfilePicture: (url: TUser['profilePictureUrl']) => void;
	handleChangeUserDetails: (name: TUser['name'], email: TUser['email']) => void;
};

const ProfileContext = createContext<TProfileContext | null>(null);

export default function ProfileContextProvider({ data, children }: ProfileContextProviderProps) {
	const [user, setUser] = useState(data.user);
	const [links, setLinks] = useState(data.links);

	const handleChangeLinks = (links: TLink[]) => {
		setLinks([...links]);
	};

	const handleChangeUserProfilePicture = (url: TUser['profilePictureUrl']) => {
		setUser((prevState) => ({
			...prevState,
			profilePictureUrl: url
		}));
	};

	const handleChangeUserDetails = (name: TUser['name'], email: TUser['email']) => {
		setUser((prevState) => ({
			...prevState,
			name,
			email
		}));
	};

	return (
		<ProfileContext.Provider
			value={{
				user,
				links,
				handleChangeLinks,
				handleChangeUserProfilePicture,
				handleChangeUserDetails
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
}

export function useProfileContext() {
	const context = useContext(ProfileContext);

	if (!context) {
		throw new Error('useProfileContext must be used within a ProfileContextProvider');
	}

	return context;
}
