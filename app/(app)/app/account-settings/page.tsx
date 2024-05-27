import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ChangePasswordForm from '@/app/(app)/app/account-settings/change-password-form';
import ChangeEmailForm from '@/app/(app)/app/account-settings/change-email-form';
import { Large } from '@/components/typography';
import { Button } from '@/components/ui/button';

export default function Page() {
	return (
		<main className='flex h-full flex-grow flex-col lg:ml-[504px]'>
			<Card>
				<CardHeader>
					<CardTitle>Account Settings</CardTitle>
					<CardDescription>Manage password, email, and two-factor authentication.</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-grow flex-col gap-6'>
					<ChangePasswordForm />
					<ChangeEmailForm />
					<div className='bg-muted grid gap-4 rounded-lg p-4 pb-6 pt-4'>
						<Large>Multi-factor Authentication</Large>
						<Button>Setup 2FA</Button>
					</div>
					<div className='bg-muted grid gap-4 rounded-lg p-4 pb-6 pt-4'>
						<Large>Danger zone</Large>
						<Button variant='destructive'>Delete account</Button>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
