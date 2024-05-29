import React from 'react';
import Header from '@/app/(app)/app/header';
import PhoneMockup from '@/app/(app)/app/phone-mockup';
import { validateRequest } from '@/lib/server-utils';
import { redirect } from 'next/navigation';
import { ROUTE_GET_STARTED, ROUTE_SIGN_UP } from '@/lib/constants';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { oauthAccountTable } from '@/db/schema';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
	const { user } = await validateRequest();
	if (!user) return redirect(ROUTE_SIGN_UP);
	if (user && !user.emailVerified) return redirect(ROUTE_GET_STARTED);

	const isOAuthUser = await db.query.oauthAccountTable.findFirst({
		where: eq(oauthAccountTable.userId, user.id)
	});

	return (
		<div className='flex min-h-svh flex-col'>
			<Header isOAuthUser={Boolean(isOAuthUser)} />
			<div className='mt-16 md:mt-28'>
				<div className='flex h-[calc(100svh-64px)] flex-grow p-4 md:h-[calc(100svh-112px)] md:gap-6 md:px-6 md:pb-6 md:pt-0 lg:h-fit'>
					<div className='bg-card fixed hidden h-[calc(100svh-136px)] w-[480px] flex-shrink-0 flex-grow-0 items-center justify-center rounded-lg border p-6 px-12 shadow-sm lg:flex'>
						<PhoneMockup />
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}
