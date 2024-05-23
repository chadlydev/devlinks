import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LinksForm from '@/app/(app)/app/(mockup)/links/links-form';

export default function LinksPage() {
	return (
		<main className='flex h-full flex-grow flex-col lg:ml-[504px]'>
			<Card>
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
