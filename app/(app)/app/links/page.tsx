import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@/components/icons';

export default function LinksPage() {
	return (
		<main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
			<Card>
				<CardHeader>
					<CardTitle>Customize your links</CardTitle>
					<CardDescription>
						Add/edit/remove links below and then share all your profiles with the world!
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col'>
					<Button variant='secondary'>
						<PlusIcon size={16} />
						Add new link
					</Button>
				</CardContent>
			</Card>
		</main>
	);
}
