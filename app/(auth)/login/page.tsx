import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
	return (
		<main>
			<Card>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Enter your details below to login to your account</CardDescription>
				</CardHeader>
				<CardContent>{/*	Form here */}</CardContent>
			</Card>
		</main>
	);
}
