'use client';

import { Button } from '@/components/ui/button';
import { ShareIcon } from '@/components/icons';
import React from 'react';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';

export default function ShareLinkButton() {
	const pathname = usePathname();
	const url = process.env.NEXT_PUBLIC_APP_URL! + pathname;

	const handleClick = async () => {
		await navigator.clipboard.writeText(url);
		toast.success('Link copied to clipboard');
	};

	return (
		<Button onClick={handleClick}>
			<ShareIcon size={16} />
			Share Link
		</Button>
	);
}
