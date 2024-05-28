import PreviewContent from '@/app/(app)/[userId]/preview-content';
import Link from 'next/link';
import { ROUTE_LINKS } from '@/lib/constants';
import { ArrowLeftIcon, ShareIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import React from 'react';
import { validateRequest } from '@/lib/server-utils';

export default async function LinksPage({ params }: { params: { userId: string } }) {
	const { user } = await validateRequest();

	let isAuthorizedUser = false;

	if (user) {
		isAuthorizedUser = user.id === params.userId;
	}

	return (
		<div className='flex min-h-svh flex-col'>
			{isAuthorizedUser && (
				<header className='bg-card fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between border-b px-4 md:m-6 md:rounded-xl md:border'>
					<Link href={ROUTE_LINKS} className='flex items-center gap-1 text-sm font-semibold'>
						<ArrowLeftIcon size={16} /> Back to Editor
					</Link>
					<Button>
						<ShareIcon size={16} />
						Share Link
					</Button>
				</header>
			)}
			<div className='bg-primary absolute -z-10 hidden h-1/3 w-full rounded-b-3xl md:block' />
			<main className='mt-24 md:mt-56'>
				<PreviewContent />
			</main>
		</div>
	);
}
