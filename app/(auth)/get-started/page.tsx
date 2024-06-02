import Separator from '@/components/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Small } from '@/components/typography';
import { ROUTE_SIGN_UP } from '@/lib/constants';
import { validateRequest } from '@/lib/server-utils';
import { redirect } from 'next/navigation';
import CancelSignUpButton from '@/app/(auth)/get-started/cancel-sign-up-button';
import RequestEmailVerificationButton from '@/app/(auth)/get-started/request-email-verification-button';
import RequestEmailChangeForm from '@/app/(auth)/get-started/request-email-change-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'devlinks - Get Started!'
};

export default async function GetStartedPage() {
	const { user } = await validateRequest();
	if (!user) return redirect(ROUTE_SIGN_UP);

	return (
		<main className='flex flex-col gap-4'>
			<CancelSignUpButton />
			<Card className='sm:w-[25rem]'>
				<CardHeader>
					<CardTitle>Get started</CardTitle>
					<CardDescription>
						For your security, we need to send a verification code to your provided email:{' '}
						<Small className='text-foreground'>{user.email}</Small>
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-4'>
					<RequestEmailVerificationButton />
					<Separator>or</Separator>
					<RequestEmailChangeForm email={user.email} />
				</CardContent>
			</Card>
		</main>
	);
}
