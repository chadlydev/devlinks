'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
	createGithubAuthorizationUrlAction,
	createGoogleAuthorizationUrlAction
} from '@/app/(auth)/actions';
import { GithubIcon, GoogleIcon } from '@/components/icons';

type OAuthButtonProps = {
	provider: 'github' | 'google';
	children: React.ReactNode;
};

export default function OAuthButton({ provider, children }: OAuthButtonProps) {
	const handleClick = async () => {
		let result;

		if (provider === 'github') {
			result = await createGithubAuthorizationUrlAction();
		} else {
			result = await createGoogleAuthorizationUrlAction();
		}

		if (result.error) {
			toast.error(result.error);
		} else if (result.success) {
			window.location.href = result.data;
		}
	};

	return (
		<Button variant='outline' type='button' onClick={handleClick} className='gap-2'>
			{provider === 'google' && <GoogleIcon size={20} />}
			{provider === 'github' && <GithubIcon size={20} />}
			{children}
		</Button>
	);
}
