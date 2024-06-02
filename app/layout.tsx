import React from 'react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '@/lib/globals.css';
import { cn } from '@/lib/utils';
import ThemeProvider from '@/components/theme-provider';
import { SessionContextProvider } from '@/contexts/session-context';
import { validateRequest } from '@/lib/server-utils';
import { Toaster } from '@/components/ui/sonner';

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
	title: 'devlinks - Maximize your Impact'
};

export const viewport: Viewport = {
	initialScale: 1,
	userScalable: false
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await validateRequest();

	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={cn('bg-background font-sans text-foreground antialiased', mori.variable)}
				suppressHydrationWarning
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<Toaster />
					<SessionContextProvider value={session}>{children}</SessionContextProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
