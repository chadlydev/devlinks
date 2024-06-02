import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import Separator from '@/components/separator';
import { Small } from '@/components/typography';
import Link from 'next/link';
import { ROUTE_GET_STARTED, ROUTE_LOGIN } from '@/lib/constants';
import SignUpForm from '@/app/(auth)/sign-up/sign-up-form';
import { validateRequest } from '@/lib/server-utils';
import { redirect } from 'next/navigation';
import OAuthButton from '@/app/(auth)/oauth-button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'devlinks - Create Account'
};

export default async function SignUpPage() {
	const { user } = await validateRequest();
	if (user && !user.emailVerified) return redirect(ROUTE_GET_STARTED);

	return (
		<main>
			<Card className='sm:w-[25rem]'>
				<CardHeader>
					<CardTitle>Create account</CardTitle>
					<CardDescription>Enter your information to create an account</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-6'>
					<div className='grid gap-2'>
						<OAuthButton provider='google'>Sign up with Google</OAuthButton>
						<OAuthButton provider='github'>Sign up with GitHub</OAuthButton>
					</div>
					<Separator>or continue with</Separator>
					<SignUpForm />
				</CardContent>
				<CardFooter className='justify-center'>
					<Small>
						Already have an account?{' '}
						<Link href={ROUTE_LOGIN} className='underline'>
							Sign in
						</Link>
					</Small>
				</CardFooter>
			</Card>
		</main>
	);
}
