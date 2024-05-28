'use client';

import React, { createContext, useContext, useState } from 'react';
import { Link, User } from '@/lib/types';

type Data = {
	user: Omit<User, 'hashedPassword' | 'emailVerified' | 'id'>;
	links: Link[];
};

type ProfileContextProviderProps = {
	data: Data;
	children: React.ReactNode;
};

type TProfileContext = {
	user: Omit<User, 'hashedPassword' | 'emailVerified' | 'id'>;
	links: Link[];
	handleChangeLinks: (links: Link[]) => void;
	handleChangeUserProfilePicture: (url: User['profilePictureUrl']) => void;
	handleChangeUserDetails: (name: User['name'], email: User['email']) => void;
};

const ProfileContext = createContext<TProfileContext | null>(null);

export default function ProfileContextProvider({ data, children }: ProfileContextProviderProps) {
	const [user, setUser] = useState(data.user);
	const [links, setLinks] = useState(data.links);

	const handleChangeLinks = (links: Link[]) => {
		setLinks([...links]);
	};

	const handleChangeUserProfilePicture = (url: User['profilePictureUrl']) => {
		setUser((prevState) => ({
			...prevState,
			profilePictureUrl: url
		}));
	};

	const handleChangeUserDetails = (name: User['name'], email: User['email']) => {
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
