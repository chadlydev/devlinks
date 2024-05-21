'use client';

import { useTheme } from 'next-themes';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ChevronsUpDownIcon, MoonIcon, SunIcon } from '@/components/icons';

export default function ThemeDropdownMenu() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [value, setValue] = useState('dark');

	useEffect(() => {
		setMounted(true);
		setValue(theme as string);
	}, [theme]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='border-input bg-muted/40 ring-offset-background placeholder:text-muted-foreground focus:ring-ring dark:bg-muted/40 flex h-fit items-center justify-between gap-1 rounded-md border px-2 py-1 text-xs capitalize focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'>
				{mounted && (
					<>
						{value === 'light' ? <SunIcon className='size-3' /> : <MoonIcon className='size-3' />}
						<span>{value}</span>
					</>
				)}
				<ChevronsUpDownIcon className='size-3 opacity-50' />
			</DropdownMenuTrigger>

			<DropdownMenuPortal>
				<DropdownMenuContent className='bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-96 w-20 overflow-clip rounded-md border p-1 shadow-md data-[side=bottom]:translate-y-1'>
					<DropdownMenuItem
						onClick={() => setTheme('light')}
						className=' focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
					>
						Light
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => setTheme('dark')}
						className='focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
					>
						Dark
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenu>
	);
}
