'use client';

import { useMediaQuery } from 'usehooks-ts';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '@/components/ui/drawer';
import { SettingsIcon } from '@/components/icons';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion';
import ChangePasswordForm from '@/app/(app)/app/change-password-form';
import ChangeEmailForm from '@/app/(app)/app/change-email-form';

export default function SettingsDialog() {
	const isDesktop = useMediaQuery('(min-width: 768px)');

	if (isDesktop) {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button variant='ghost' size='icon'>
						<SettingsIcon size={16} />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Account Settings</DialogTitle>
						<DialogDescription>Manage password, and email.</DialogDescription>
					</DialogHeader>
					<Settings />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant='ghost' size='icon'>
					<SettingsIcon size={16} />
				</Button>
			</DrawerTrigger>
			<DrawerContent className='p-4 pb-8'>
				<DrawerHeader className='p-0 pb-4 pt-6  text-left'>
					<DrawerTitle>Account Settings</DrawerTitle>
					<DrawerDescription>Manage password, and email.</DrawerDescription>
				</DrawerHeader>
				<Settings />
			</DrawerContent>
		</Drawer>
	);
}

function Settings() {
	return (
		<Accordion type='single' collapsible>
			<AccordionItem value='change-password'>
				<AccordionTrigger>Change Password</AccordionTrigger>
				<AccordionContent className='p-2 pb-4'>
					<ChangePasswordForm />
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='change-email'>
				<AccordionTrigger>Change Email</AccordionTrigger>
				<AccordionContent className='p-2 pb-4'>
					<ChangeEmailForm />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
