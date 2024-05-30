import PageContent from '@/app/(app)/[slug]/page-content';
import Link from 'next/link';
import { ROUTE_LINKS } from '@/lib/constants';
import { ArrowLeftIcon } from '@/components/icons';
import React from 'react';
import { validateRequest } from '@/lib/server-utils';
import { db } from '@/db';
import { eq, or } from 'drizzle-orm';
import { linkTable, userTable } from '@/db/schema';
import { notFound } from 'next/navigation';
import ShareLinkButton from '@/app/(app)/[slug]/share-link-button';
import type { TLink } from '@/lib/types';

export default async function LinksPage({ params }: { params: { slug: string } }) {
	const { user } = await validateRequest();

	let isAuthorizedUser = false;

	// It can be id or url, so first check this out
	const userResult = await db.query.userTable.findFirst({
		where: or(eq(userTable.id, params.slug), eq(userTable.url, params.slug))
	});

	if (!userResult) {
		notFound();
	}

	// compare the id's below to set AuthorizedUser
	if (user) {
		isAuthorizedUser = user.id === userResult.id;
	}

	const links = await db.query.linkTable.findMany({ where: eq(linkTable.userId, params.slug) });

	return (
		<div className='flex min-h-svh flex-col'>
			{isAuthorizedUser && (
				<header className='bg-card flex h-16 items-center justify-between border-b px-4 md:m-6 md:rounded-xl md:border'>
					<Link href={ROUTE_LINKS} className='flex items-center gap-1 text-sm font-semibold'>
						<ArrowLeftIcon size={16} /> Back to Editor
					</Link>
					<ShareLinkButton />
				</header>
			)}
			<div className='bg-primary absolute -z-10 hidden h-1/3 w-full rounded-b-3xl md:block' />
			<main className='my-8 md:m-auto md:py-8'>
				<PageContent
					links={links as TLink[]}
					profileDetails={{
						name: userResult.name!,
						displayEmail: userResult.displayEmail!,
						profilePictureUrl: userResult.profilePictureUrl!
					}}
				/>
			</main>
		</div>
	);
}
