import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROUTE_LOGIN } from '@/lib/constants';
import ThemeDropdownMenu from '@/components/theme-dropdown-menu';
import { validateRequest } from '@/lib/server-utils';

export default async function Header() {
	const { user } = await validateRequest();

	return (
		<header className='flex h-24 items-center justify-between p-4'>
			<Logo />
			<div className='flex items-center gap-4'>
				<ThemeDropdownMenu />
				<Button asChild>
					<Link href={ROUTE_LOGIN}>{!user ? 'Login' : 'Go to dashboard'}</Link>
				</Button>
			</div>
		</header>
	);
}
