import Separator from '@/components/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Small } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { ROUTE_SIGN_UP } from '@/lib/constants';
import { ArrowLeftIcon } from '@/components/icons';
import Link from '@/components/link';

export default function GetStartedPage() {
	return (
		<main className='flex flex-col gap-4'>
			<Link href={ROUTE_SIGN_UP}>
				<ArrowLeftIcon size={16} /> Back to signup
			</Link>
			<Card className='sm:w-[25rem]'>
				<CardHeader>
					<CardTitle>Get started</CardTitle>
					<CardDescription>
						For your security, we need to send a verification code to your provided email:{' '}
						<Small className='text-foreground'>chadly@live.nl</Small>
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-4'>
					<Button>Send verification code</Button>
					<Separator>or</Separator>
					<Button variant='secondary'>Change email address</Button>
				</CardContent>
			</Card>
		</main>
	);
}
