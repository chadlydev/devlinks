import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function Header() {
	return (
		<header className='flex items-center justify-between p-4'>
			<Logo />
			<Button size='sm' variant='secondary'>
				Get started
			</Button>
		</header>
	);
}
