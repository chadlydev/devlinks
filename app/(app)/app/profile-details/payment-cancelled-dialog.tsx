'use client';

import { useMediaQuery } from 'usehooks-ts';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle
} from '@/components/ui/drawer';
import { useEffect, useState } from 'react';
import GoProButton from '@/app/(app)/app/go-pro-button';

export default function PaymentCancelledDialog() {
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
						<DialogTitle>Please try again</DialogTitle>
						<DialogDescription>Your payment was cancelled!</DialogDescription>
					</DialogHeader>
					<GoProButton />
					<DialogClose>Cancel</DialogClose>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={mounted}>
			<DrawerContent className='p-4 pb-8'>
				<DrawerHeader className='p-0 pb-4 pt-6  text-left'>
					<DrawerTitle>Please try again</DrawerTitle>
					<DrawerDescription>Your payment was cancelled!</DrawerDescription>
				</DrawerHeader>
				<GoProButton />
				<DrawerClose>Cancel</DrawerClose>
			</DrawerContent>
		</Drawer>
	);
}
