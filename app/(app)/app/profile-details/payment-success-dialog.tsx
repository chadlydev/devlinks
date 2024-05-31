'use client';

import { useMediaQuery } from 'usehooks-ts';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle
} from '@/components/ui/drawer';
import Link from 'next/link';
import { ROUTE_LINKS } from '@/lib/constants';
import { useEffect, useState } from 'react';

export default function PaymentSuccessDialog() {
	const isDesktop = useMediaQuery('(min-width: 768px)');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (isDesktop && mounted) {
		return (
			<Dialog defaultOpen={true}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Welcome to PRO</DialogTitle>
						<DialogDescription>
							Enjoy your lifetime subscription with so much benefits!
						</DialogDescription>
					</DialogHeader>
					<Button asChild>
						<Link href={ROUTE_LINKS}>Explore</Link>
					</Button>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={mounted}>
			<DrawerContent className='p-4 pb-8'>
				<DrawerHeader className='p-0 pb-4 pt-6  text-left'>
					<DrawerTitle>Welcome to PRO</DrawerTitle>
					<DrawerDescription>
						Enjoy your lifetime subscription with so much benefits!
					</DrawerDescription>
				</DrawerHeader>
				<Button asChild>
					<Link href={ROUTE_LINKS}>Explore</Link>
				</Button>
			</DrawerContent>
		</Drawer>
	);
}
