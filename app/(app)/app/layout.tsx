import React from 'react';
import Header from '@/app/(app)/app/header';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex min-h-svh flex-col'>
			<Header />
			<div className='mt-16 md:mt-20'>{children}</div>
		</div>
	);
}
