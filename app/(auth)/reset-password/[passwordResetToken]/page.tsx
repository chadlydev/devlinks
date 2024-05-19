import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ResetPasswordForm from '@/app/(auth)/reset-password/[passwordResetToken]/reset-password-form';

export default function PasswordResetPage() {
	return (
		<main>
			<Card className='sm:w-[25rem]'>
				<CardHeader>
					<CardTitle>Set new password</CardTitle>
					<CardDescription>Enter your new password below to proceed</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-4'>
					<ResetPasswordForm />
				</CardContent>
			</Card>
		</main>
	);
}
