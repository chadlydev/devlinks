import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VerifyEmailForm from '@/app/(auth)/verify-email/verify-email-form';
import { validateRequest } from '@/lib/server-utils';
import { ROUTE_SIGN_UP } from '@/lib/constants';
import { redirect } from 'next/navigation';

export default async function VerifyEmailPage() {
	const { user } = await validateRequest();
	if (!user) return redirect(ROUTE_SIGN_UP);

	return (
		<Card className='sm:w-[25rem]'>
			<CardHeader>
				<CardTitle>Please check your inbox</CardTitle>
				<CardDescription>Enter your 8-digit code below to verify your email</CardDescription>
			</CardHeader>
			<CardContent>
				<VerifyEmailForm />
			</CardContent>
		</Card>
	);
}
