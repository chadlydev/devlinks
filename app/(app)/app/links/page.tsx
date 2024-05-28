import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LinksForm from '@/app/(app)/app/links/links-form';
import { validateRequest } from '@/lib/server-utils';
import { redirect } from 'next/navigation';
import { ROUTE_GET_STARTED, ROUTE_SIGN_UP } from '@/lib/constants';

export default async function LinksPage() {
	const { user } = await validateRequest();
	if (!user) return redirect(ROUTE_SIGN_UP);
	if (!user.emailVerified) return redirect(ROUTE_GET_STARTED);

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
