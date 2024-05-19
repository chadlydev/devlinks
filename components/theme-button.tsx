'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@/components/icons';

export default function ThemeButton() {
	const { resolvedTheme, setTheme } = useTheme();

	const toggleTheme = () => {
		if (resolvedTheme === 'dark') {
			setTheme('light');
		} else if (resolvedTheme === 'light') {
			setTheme('dark');
		}
	};

	return (
		<Button onClick={toggleTheme} variant='secondary' size='icon' className='size-[33.333px]'>
			{resolvedTheme === 'light' ? <MoonIcon size={16} /> : <SunIcon size={16} />}
		</Button>
	);
}
