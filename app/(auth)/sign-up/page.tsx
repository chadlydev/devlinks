import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GithubIcon, GoogleIcon } from '@/components/icons';
import Separator from '@/components/separator';
import { Small } from '@/components/typography';
import Link from 'next/link';
import { ROUTE_LOGIN } from '@/lib/constants';
import SignUpForm from '@/app/(auth)/sign-up/sign-up-form';

export default function SignUpPage() {
	return (
		<main>
			<Card className='sm:w-[25rem]'>
				<CardHeader>
					<CardTitle>Create account</CardTitle>
					<CardDescription>Enter your information to create an account</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-6'>
					<div className='grid gap-2'>
						<Button variant='outline' type='button' size='sm' className='gap-2'>
							<GoogleIcon size={16} />
							Sign up with Google
						</Button>
						<Button variant='outline' type='button' size='sm' className='gap-2'>
							<GithubIcon size={16} />
							Sign up with GitHub
						</Button>
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
