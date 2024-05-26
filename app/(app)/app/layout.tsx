import React from 'react';
import Header from '@/app/(app)/app/header';
import PhoneMockup from '@/app/(app)/app/phone-mockup';
import ProfileContextProvider from '@/contexts/profile-context';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
	const data = {
		user: {
			name: 'Chadly Riedewald',
			email: 'hi@chadly.dev',
			profilePictureUrl: ''
		},
		links: []
	};

	return (
		<div className='flex min-h-svh flex-col'>
			<Header />
			<div className='mt-16 md:mt-28'>
				<ProfileContextProvider data={data}>
					<div className='flex h-[calc(100svh-64px)] flex-grow p-4 md:h-[calc(100svh-112px)] md:gap-6 md:px-6 md:pb-6 md:pt-0 lg:h-fit'>
						<div className='bg-card fixed hidden h-[calc(100svh-136px)] w-[480px] flex-shrink-0 flex-grow-0 items-center justify-center rounded-lg border p-6 px-12 shadow-sm lg:flex'>
							<PhoneMockup />
						</div>
						{children}
					</div>
				</ProfileContextProvider>
			</div>
		</div>
	);
}
