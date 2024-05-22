'use client';

import Link from 'next/link';
import {
	ROUTE_ACCOUNT_SETTINGS,
	ROUTE_LINKS,
	ROUTE_PREVIEW_PAGE,
	ROUTE_PROFILE_DETAILS,
	ROUTE_ROOT
} from '@/lib/constants';
import { LogoIcon } from '@/components/icons/logo-icon';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	AccountIcon,
	EyeIcon,
	LinkIcon,
	LogoutIcon,
	MenuIcon,
	SettingsIcon
} from '@/components/icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ThemeDropdownMenu from '@/components/theme-dropdown-menu';
import { Small } from '@/components/typography';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navigation = [
	{
		href: ROUTE_LINKS,
		name: 'Links',
		icon: <LinkIcon size={16} />
	},
	{
		href: ROUTE_PROFILE_DETAILS,
		name: 'Profile Details',
		icon: <AccountIcon size={16} />
	},
	{
		href: ROUTE_ACCOUNT_SETTINGS,
		name: 'Account Settings',
		icon: <SettingsIcon size={16} />
	},
	{
		href: ROUTE_PREVIEW_PAGE,
		name: 'Preview Page',
		icon: <EyeIcon size={16} />
	}
];

export default function Header() {
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className='bg-card/80 fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between border-b px-4 backdrop-blur-sm md:m-4 md:grid md:grid-cols-3 md:rounded-xl md:border'>
			<Link href={ROUTE_ROOT} className='w-fit'>
				<LogoIcon />
			</Link>

			<nav className='hidden justify-self-center md:inline-block'>
				<ul className='flex flex-row gap-4'>
					{navigation.map((route, i) => (
						<li key={i}>
							<Link
								href={route.href}
								className={cn(
									'hover:text-primary ring-offset-background focus-visible:ring-ring inline-flex h-10 w-full min-w-14 items-center justify-center whitespace-nowrap rounded-lg px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 lg:gap-2 lg:text-sm lg:font-semibold',
									{
										'bg-secondary text-secondary-foreground hover:text-secondary-foreground':
											pathname === route.href
									}
								)}
							>
								{route.icon}
								<span className='hidden lg:inline'>{route.name}</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<Sheet open={menuOpen} onOpenChange={setMenuOpen}>
				<SheetTrigger asChild>
					<Button variant='outline' size='icon' className='md:justify-self-end'>
						<MenuIcon size={16} />
					</Button>
				</SheetTrigger>
				<SheetContent className='flex flex-col pt-12'>
					<nav>
						<ul className='flex flex-col gap-2'>
							{navigation.map((route, i) => (
								<li key={i} onClick={() => setMenuOpen(false)}>
									<Link
										href={route.href}
										className={cn(
											'ring-offset-background focus-visible:ring-ring ml-[-0.65rem] inline-flex h-10 w-full items-center gap-4 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ',
											{
												'bg-secondary text-secondary-foreground': pathname === route.href
											}
										)}
									>
										{route.icon}
										{route.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<div className='mt-auto flex items-center justify-between'>
						<Small>Theme</Small>
						<ThemeDropdownMenu />
					</div>
					<Button>
						<LogoutIcon size={16} />
						Logout
					</Button>
				</SheetContent>
			</Sheet>
		</header>
	);
}
