import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/app/(auth)/login/login-form';

export default function Page() {
	return (
		<main>
			<Card className=''>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Enter your details below to login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>
			</Card>
		</main>
	);
}
