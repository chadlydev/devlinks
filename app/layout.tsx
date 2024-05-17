import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';

const mori = localFont({
	src: [
		{
			path: './fonts/mori-book.woff2',
			weight: '300',
			style: 'normal'
		},
		{
			path: './fonts/mori-regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: './fonts/mori-semibold.woff2',
			weight: '600',
			style: 'normal'
		}
	],
	variable: '--font-mori'
});

export const metadata: Metadata = {
	title: 'devlinks'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={cn('bg-background text-foreground font-sans antialiased', mori.variable)}>
				{children}
			</body>
		</html>
	);
}
