'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { MoonIcon } from 'lucide-react';

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
		<Button onClick={toggleTheme} size='icon'>
			<MoonIcon />
		</Button>
	);
}
