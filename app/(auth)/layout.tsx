import React from 'react';
import Logo from '@/components/logo';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex min-h-svh flex-col gap-16 px-4 pt-8 md:items-center md:justify-center md:gap-8 md:pt-0'>
			<Logo />
			{children}
		</div>
	);
}
