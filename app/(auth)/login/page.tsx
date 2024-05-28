import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import LoginForm from '@/app/(auth)/login/login-form';
import Link from 'next/link';
import { ROUTE_GET_STARTED, ROUTE_SIGN_UP } from '@/lib/constants';
import { Small } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Separator from '@/components/separator';
import { GithubIcon, GoogleIcon } from '@/components/icons';
import { validateRequest } from '@/lib/server-utils';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
	const { user } = await validateRequest();
	if (user && !user.emailVerified) return redirect(ROUTE_GET_STARTED);

	return (
		<main>
			<Card className='sm:w-[25rem]'>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Enter your details below to login to your account</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-6'>
					<div className='grid gap-2'>
						<Button variant='outline' type='button' className='gap-2'>
							<GoogleIcon size={16} />
							Login with Google
						</Button>
						<Button variant='outline' type='button' className='gap-2'>
							<GithubIcon size={16} />
							Login with GitHub
						</Button>
					</div>
					<Separator>or continue with</Separator>
					<LoginForm />
				</CardContent>
				<CardFooter className='justify-center'>
					<Small>
						Don&apos;t have an account?{' '}
						<Link href={ROUTE_SIGN_UP} className='underline'>
							Sign up
						</Link>
					</Small>
				</CardFooter>
			</Card>
		</main>
	);
}
