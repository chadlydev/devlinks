import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import IllustrationPhoneMockup from '@/app/(app)/app/links/illustration-phone-mockup';
import LinksForm from '@/app/(app)/app/links/links-form';

export default function LinksPage() {
	return (
		<main className='flex h-[calc(100svh-64px)] flex-grow p-4 md:h-[calc(100svh-80px)] lg:h-fit lg:gap-6 lg:p-6'>
			<div className='bg-card fixed hidden h-[calc(100svh-144px)] w-[480px] flex-shrink-0 flex-grow-0 items-center justify-center rounded-lg border p-6 px-12 shadow-sm lg:flex'>
				<IllustrationPhoneMockup />
			</div>
			<Card className='flex h-full flex-grow flex-col lg:ml-[504px]'>
				<CardHeader>
					<CardTitle>Customize your links</CardTitle>
					<CardDescription>
						Add/edit/remove links below and then share all your profiles with the world!
					</CardDescription>
				</CardHeader>
				<CardContent className='flex-grow'>
					<LinksForm />
				</CardContent>
			</Card>
		</main>
	);
}
