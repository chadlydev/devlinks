import React from 'react';
import ProfileContextProvider from '@/contexts/profile-context';
import { validateRequest } from '@/lib/server-utils';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { linkTable } from '@/db/schema';
import { TLink } from '@/lib/types';

export default async function Layout({ children }: { children: React.ReactNode }) {
	const { user } = await validateRequest();

	if (!user) return children;

	const links: TLink[] = await db.query.linkTable.findMany({
		where: eq(linkTable.userId, user.id)
	});

	return <ProfileContextProvider data={{ user, links }}>{children}</ProfileContextProvider>;
}
