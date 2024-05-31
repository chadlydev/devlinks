import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProfilePictureForm from '@/app/(app)/app/profile-details/profile-picture-form';
import ProfileDetailsForm from '@/app/(app)/app/profile-details/profile-details-form';
import { validateRequest } from '@/lib/server-utils';
import { redirect } from 'next/navigation';
import { ROUTE_GET_STARTED, ROUTE_SIGN_UP } from '@/lib/constants';
import PaymentSuccessDialog from '@/app/(app)/app/profile-details/payment-success-dialog';
import PaymentCancelledDialog from '@/app/(app)/app/profile-details/payment-cancelled-dialog';

export default async function ProfileDetailsPage({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const { user } = await validateRequest();
	if (!user) return redirect(ROUTE_SIGN_UP);
	if (!user.emailVerified) return redirect(ROUTE_GET_STARTED);

	console.log(searchParams);

	return (
		<main className='flex h-full flex-grow flex-col lg:ml-[504px]'>
			<Card>
				<CardHeader>
					<CardTitle>Profile Details</CardTitle>
					<CardDescription>
						Add your details to create a personal touch to your profile.
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-6'>
					<ProfilePictureForm />
					<ProfileDetailsForm />
					{searchParams.payment_success && <PaymentSuccessDialog />}
					{searchParams.payment_cancelled && <PaymentCancelledDialog />}
				</CardContent>
			</Card>
		</main>
	);
}
