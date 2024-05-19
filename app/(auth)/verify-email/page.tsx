import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VerifyEmailForm from '@/app/(auth)/verify-email/verify-email-form';

export default function VerifyEmailPage() {
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
