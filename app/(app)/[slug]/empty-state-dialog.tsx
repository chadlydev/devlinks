'use client';

import { useMediaQuery } from 'usehooks-ts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import Link from 'next/link';
import { ROUTE_LINKS } from '@/lib/constants';

export default function EmptyStateDialog() {
	const isDesktop = useMediaQuery('(min-width: 768px)');

	if (isDesktop) {
		return (
			<Dialog defaultOpen={true}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>It seems really empty here</DialogTitle>
						<DialogDescription>
							Please go back to editor to add some links to your profile.
						</DialogDescription>
					</DialogHeader>
					<Button asChild>
						<Link href={ROUTE_LINKS}>Go back</Link>
					</Button>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={true}>
			<DrawerContent className='p-4 pb-8'>
				<DrawerHeader className='p-0 pb-4 pt-6  text-left'>
					<DrawerTitle>It seems really empty here</DrawerTitle>
					<DrawerDescription>
						Please go back to editor to add some links to your profile.
					</DrawerDescription>
				</DrawerHeader>
				<Button asChild>
					<Link href={ROUTE_LINKS}>Go back</Link>
				</Button>
			</DrawerContent>
		</Drawer>
	);
}
