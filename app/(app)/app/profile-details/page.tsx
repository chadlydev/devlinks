import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfileDetailsPage() {
	return (
		<main className='flex h-full flex-grow flex-col lg:ml-[504px]'>
			<Card>
				<CardHeader>
					<CardTitle>Profile Details</CardTitle>
					<CardDescription>
						Add your details to create a personal touch to your profile.
					</CardDescription>
				</CardHeader>
				<CardContent className='flex-grow'></CardContent>
			</Card>
		</main>
	);
}
