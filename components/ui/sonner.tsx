'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
import {
	CircleAlertIcon,
	CircleCheckIcon,
	InfoIcon,
	LoaderCircleIcon,
	TriangleAlertIcon
} from '@/components/icons';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps['theme']}
			richColors
			className='toaster group'
			toastOptions={{
				classNames: {
					default: 'font-sans',
					toast:
						'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
					description: 'group-[.toast]:text-muted-foreground',
					actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
					cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground'
				}
			}}
			icons={{
				error: <CircleAlertIcon size={20} />,
				success: <CircleCheckIcon size={20} />,
				warning: <TriangleAlertIcon size={20} />,
				info: <InfoIcon size={20} />,
				loading: <LoaderCircleIcon size={20} className='animate-spin' />
			}}
			position='top-center'
			{...props}
		/>
	);
};

export { Toaster };
