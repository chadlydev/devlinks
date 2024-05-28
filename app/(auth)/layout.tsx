import React from 'react';
import Logo from '@/components/logo';
import { validateRequest } from '@/lib/server-utils';
import { redirect } from 'next/navigation';
import { ROUTE_LINKS } from '@/lib/constants';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
	const { user } = await validateRequest();
	if (user && user.emailVerified) return redirect(ROUTE_LINKS);

	return (
		<div className='flex min-h-svh flex-col gap-16 px-4 sm:items-center sm:justify-center sm:gap-8 sm:pt-0'>
			<header className='flex h-24 items-center sm:h-fit'>
				<Logo />
			</header>
			{children}
		</div>
	);
}
