'use client';

import { Large, Small } from '@/components/typography';
import { SocialLink } from '@/components/social-link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useProfileContext } from '@/contexts/profile-context';
import { TPlatformValue } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { AccountIcon } from '@/components/icons';
import React from 'react';

export default function PhoneMockup() {
	const { user, links } = useProfileContext();

	return (
		<div className='relative'>
			<svg
				width='308'
				height='632'
				viewBox='0 0 308 632'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g clipPath='url(#illustration-phone-mockup 1__a)'>
					<path
						d='M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z'
						className='stroke-border fill-background'
					/>
					<path
						d='M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z'
						className='stroke-border fill-card dark:fill-card-foreground/10'
					/>
				</g>
			</svg>

			<div className='absolute top-0 z-20 h-full w-[306px] bg-transparent' />
			<div className='absolute left-10 top-0 flex w-[226px] flex-grow flex-col items-center gap-12 overflow-x-clip whitespace-nowrap pt-16'>
				<div className='flex flex-col items-center gap-5'>
					{user.profilePictureUrl ? (
						<Avatar className='bg-card size-24 border'>
							<AvatarImage src={user.profilePictureUrl} alt='avatar' />
							<AvatarFallback className='text-muted-foreground'>
								<AccountIcon size={48} />
							</AvatarFallback>
						</Avatar>
					) : (
						<Skeleton className='size-24 animate-none rounded-full' />
					)}
					<div className='flex flex-col items-center gap-2'>
						{user.name ? (
							<Large>{user.name}</Large>
						) : (
							<Skeleton className='h-7 w-48 animate-none' />
						)}
						{user.email ? (
							<Small>{user.displayEmail}</Small>
						) : (
							<Skeleton className='h-3.5 w-28 animate-none' />
						)}
					</div>
				</div>

				<div className='z-10 flex w-full flex-col items-center gap-6'>
					{links
						.slice(0, 5)
						.filter((link) => link.platform)
						.map((link, index) => (
							<SocialLink key={index} variant={link.platform as TPlatformValue} />
						))}
				</div>

				<div className='absolute top-[278px] flex w-full flex-col items-center gap-6'>
					{Array.from({ length: 5 }).map((_, index) => (
						<Skeleton key={index} className='h-10 w-[226px] animate-none rounded-md' />
					))}
				</div>
			</div>
		</div>
	);
}
