import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@/components/icons';
import EmptyState from '@/app/(app)/app/links/empty-state';
import Image from 'next/image';
import phoneMockup from '@/public/illustration-phone-mockup.svg';

export default function LinksPage() {
	return (
		<main className='flex p-4 lg:gap-6 lg:p-6'>
			<div className='bg-card hidden w-[480px] flex-shrink-0 flex-grow-0 items-center justify-center rounded-lg border p-6 px-12 shadow-sm lg:flex'>
				<Image src={phoneMockup} alt='phone mockup' />
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Customize your links</CardTitle>
					<CardDescription>
						Add/edit/remove links below and then share all your profiles with the world!
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-8'>
					<Button variant='secondary'>
						<PlusIcon size={16} />
						Add new link
					</Button>

					{/*	TODO add Empty state */}
					<EmptyState />

					{/*	TODO add Link form */}
				</CardContent>
			</Card>
		</main>
	);
}
