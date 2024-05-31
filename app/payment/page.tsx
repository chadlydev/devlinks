import Logo from '@/components/logo';
import React from 'react';
import { validateRequest } from '@/lib/server-utils';
import { redirect } from 'next/navigation';
import { ROUTE_LINKS, ROUTE_SIGN_UP } from '@/lib/constants';
import PurchaseButton from '@/app/payment/purchase-button';
import { Large } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Page({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const { user } = await validateRequest();
	if (!user) return redirect(ROUTE_SIGN_UP);

	const showSuccess = searchParams.success || user.subscription === 'pro';

	return (
		<div className='flex min-h-svh flex-col gap-16 px-4 sm:items-center sm:justify-center sm:gap-8 sm:pt-0'>
			<header className='flex h-24 items-center sm:h-fit'>
				<Logo />
			</header>

			{!searchParams.success && !searchParams.cancelled && !showSuccess && <PurchaseButton />}
			{showSuccess && (
				<>
					<div className='flex flex-col items-center gap-4'>
						<Large className='text-green-500'>
							Thank your for purchasing lifetime PRO access to devlinks.
						</Large>
						<Button asChild className='w-1/2'>
							<Link href={ROUTE_LINKS}>Explore</Link>
						</Button>
					</div>
				</>
			)}
			{searchParams.cancelled && (
				<>
					<div className='flex flex-col items-center gap-4'>
						<Large className='text-red-500'>Something went wrong, please try again.</Large>
						<PurchaseButton />
					</div>
				</>
			)}
		</div>
	);
}
