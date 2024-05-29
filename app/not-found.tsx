import Logo from '@/components/logo';
import React from 'react';
import { H1, H4, Muted } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROUTE_ROOT } from '@/lib/constants';
import { ArrowLeftIcon } from '@/components/icons';

export default function NotFound() {
	return (
		<div className='flex min-h-svh flex-col items-center justify-center gap-8 px-4 pt-0'>
			<header className='flex h-24 items-center'>
				<Logo />
			</header>
			<main className='flex max-w-sm flex-col items-center gap-4 text-center xl:max-w-lg'>
				<H1>404 - Page Not Found</H1>
				<H4>Oops! It seems like the page you&apos;re looking for has gone on an adventure.</H4>

				<Muted>
					The page might have been moved, deleted, or you might have typed the address wrong.
				</Muted>
				<Button asChild className='mt-8 w-fit'>
					<Link href={ROUTE_ROOT}>
						<ArrowLeftIcon size={16} /> Back to homepage
					</Link>
				</Button>
			</main>
		</div>
	);
}
