import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
	return (
		<main>
			<Card className='m-auto mt-20 max-w-sm'>
				<CardHeader>
					<CardTitle>Card</CardTitle>
					<CardDescription>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, sit?
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-2'>
					<Button>Button</Button>
					<Button variant='secondary'>Button</Button>
					<Button variant='outline'>Button</Button>
					<Button variant='destructive'>Button</Button>
					<Button variant='ghost'>Button</Button>
					<Button variant='link'>Button</Button>
				</CardContent>
				<CardFooter>Footer</CardFooter>
			</Card>
		</main>
	);
}
