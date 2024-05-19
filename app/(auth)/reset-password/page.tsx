import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RequestPasswordResetForm from '@/app/(auth)/reset-password/request-password-reset-form';
import Link from 'next/link';
import { ROUTE_LOGIN } from '@/lib/constants';
import { ArrowLeftIcon } from '@/components/icons';

export default function RequestPasswordResetPage() {
	return (
		<main className='flex flex-col gap-4'>
			<Link
				href={ROUTE_LOGIN}
				className='hover:text-primary flex max-w-fit items-center gap-2 text-sm'
			>
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
