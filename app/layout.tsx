import React from 'react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '../lib/globals.css';
import { cn } from '@/lib/utils';
import ThemeProvider from '@/components/theme-provider';

const mori = localFont({
	src: [
		{
			path: '../public/fonts/mori-book.woff2',
			weight: '300',
			style: 'normal'
		},
		{
			path: '../public/fonts/mori-regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../public/fonts/mori-semibold.woff2',
			weight: '600',
			style: 'normal'
		}
	],
	variable: '--font-mori'
});

export const metadata: Metadata = {
	title: 'devlinks'
};

export const viewport: Viewport = {
	initialScale: 1,
	userScalable: false
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={cn('bg-background text-foreground font-sans antialiased', mori.variable)}
				suppressHydrationWarning
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
