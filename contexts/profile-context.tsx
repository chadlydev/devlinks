'use client';

import React, { createContext, useContext, useState } from 'react';
import { Link, User } from '@/lib/types';

type Data = {
	user: User;
	links: Link[];
};

type ProfileContextProviderProps = {
	data: Data;
	children: React.ReactNode;
};

type TProfileContext = {
	user: User;
	links: Link[];
};

const ProfileContext = createContext<TProfileContext | null>(null);

export default function ProfileContextProvider({ data, children }: ProfileContextProviderProps) {
	const [user, setUser] = useState(data.user);
	const [links, setLinks] = useState(data.links);

	return <ProfileContext.Provider value={{ user, links }}>{children}</ProfileContext.Provider>;
}

export function useProfileContext() {
	const context = useContext(ProfileContext);

	if (!context) {
		throw new Error('useProfileContext must be used within a ProfileContextProvider');
	}

	return context;
}