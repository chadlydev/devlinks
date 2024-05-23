import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
	return (
		<main className='flex h-full flex-grow flex-col lg:ml-[504px]'>
			<Card>
				<CardHeader>
					<CardTitle>Account Settings</CardTitle>
					<CardDescription>Manage password, email, and two-factor authentication.</CardDescription>
				</CardHeader>
				<CardContent className='flex-grow'></CardContent>
			</Card>
		</main>
	);
}
