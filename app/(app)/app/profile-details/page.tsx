import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProfilePictureForm from '@/app/(app)/app/profile-details/profile-picture-form';

export default function ProfileDetailsPage() {
	return (
		<main className='flex h-full flex-grow flex-col lg:ml-[504px]'>
			<Card>
				<CardHeader>
					<CardTitle>Profile Details</CardTitle>
					<CardDescription>
						Add your details to create a personal touch to your profile.
					</CardDescription>
				</CardHeader>
				<CardContent className='flex-grow'>
					<ProfilePictureForm />
				</CardContent>
			</Card>
		</main>
	);
}
