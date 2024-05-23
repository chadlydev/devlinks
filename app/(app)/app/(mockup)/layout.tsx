import React from 'react';
import IllustrationPhoneMockup from '@/app/(app)/app/(mockup)/illustration-phone-mockup';

export default async function MockupLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex h-[calc(100svh-64px)] flex-grow p-4 md:h-[calc(100svh-112px)] md:gap-6 md:px-6 md:pb-6 md:pt-0 lg:h-fit'>
			<div className='bg-card fixed hidden h-[calc(100svh-136px)] w-[480px] flex-shrink-0 flex-grow-0 items-center justify-center rounded-lg border p-6 px-12 shadow-sm lg:flex'>
				<IllustrationPhoneMockup />
			</div>
			{children}
		</div>
	);
}
