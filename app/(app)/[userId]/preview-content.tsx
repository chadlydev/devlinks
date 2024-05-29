'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AccountIcon } from '@/components/icons';
import { Large, Small } from '@/components/typography';
import { SocialButton } from '@/components/social-button';
import { Link, PlatformValue } from '@/lib/types';

// TODO extract type
type ProfileDetails = {
	name: string;
	profilePictureUrl: string;
	displayEmail: string;
};

export default function PreviewContent({
	links,
	profileDetails
}: {
	links: Link[];
	profileDetails: ProfileDetails;
}) {
	return (
		<div className='md:bg-card z-20 flex w-full flex-grow flex-col items-center gap-12 overflow-x-clip whitespace-nowrap px-12 md:mx-auto md:w-96 md:rounded-2xl md:border md:px-8 md:py-12'>
			<div className='flex flex-col items-center gap-5'>
				<Avatar className='bg-card size-24 border'>
					<AvatarImage src={profileDetails?.profilePictureUrl} alt='avatar' />
					<AvatarFallback className='text-muted-foreground'>
						<AccountIcon size={48} />
					</AvatarFallback>
				</Avatar>
				<div className='flex flex-col items-center gap-2'>
					{profileDetails?.name && <Large>{profileDetails?.name}</Large>}
					{profileDetails?.displayEmail && <Small>{profileDetails?.displayEmail}</Small>}
				</div>
			</div>

			<div className='z-10 flex w-full flex-col items-center gap-4'>
				{links
					.filter((link) => link.platform)
					.map((link, index) => (
						<SocialButton key={index} variant={link.platform as PlatformValue} />
					))}
			</div>
		</div>
	);
}
