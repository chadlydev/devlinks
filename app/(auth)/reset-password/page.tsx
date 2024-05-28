import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RequestPasswordResetForm from '@/app/(auth)/reset-password/request-password-reset-form';
import { ROUTE_GET_STARTED, ROUTE_LOGIN } from '@/lib/constants';
import { ArrowLeftIcon } from '@/components/icons';
import Link from '@/components/link';
import { validateRequest } from '@/lib/server-utils';
import { redirect } from 'next/navigation';

export default async function RequestPasswordResetPage() {
	const { user } = await validateRequest();
	if (user && !user.emailVerified) return redirect(ROUTE_GET_STARTED);

	return (
		<main className='flex flex-col gap-4'>
			<Link href={ROUTE_LOGIN}>
				<ArrowLeftIcon size={16} /> Back to login
			</Link>
			<Card className='sm:w-[25rem]'>
				<CardHeader>
					<CardTitle>Request password reset</CardTitle>
					<CardDescription>Please enter your email below to continue</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-4'>
					<RequestPasswordResetForm />
				</CardContent>
			</Card>
		</main>
	);
}
