'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AccountIcon } from '@/components/icons';
import { Large, Small } from '@/components/typography';
import { SocialButton } from '@/components/social-button';
import { PlatformValue } from '@/lib/types';
import { useProfileContext } from '@/contexts/profile-context';

export default function PreviewContent() {
	const { user, links } = useProfileContext();

	return (
		<div className='md:bg-card z-20 flex w-full flex-grow flex-col items-center gap-12 overflow-x-clip whitespace-nowrap px-12 md:mx-auto md:w-96 md:rounded-2xl md:border md:px-8 md:py-12'>
			<div className='flex flex-col items-center gap-5'>
				<Avatar className='bg-card size-24 border'>
					<AvatarImage src={user.profilePictureUrl} alt='avatar' />
					<AvatarFallback className='text-muted-foreground'>
						<AccountIcon size={48} />
					</AvatarFallback>
				</Avatar>
				<div className='flex flex-col items-center gap-2'>
					{user.name && <Large>{user.name}</Large>}
					{user.email && <Small>{user.email}</Small>}
				</div>
			</div>

			<div className='z-10 flex w-full flex-col items-center gap-6'>
				{links
					.slice(0, 5)
					.filter((link) => link.platform)
					.map((link, index) => (
						<SocialButton key={index} variant={link.platform as PlatformValue} />
					))}
			</div>
		</div>
	);
}
