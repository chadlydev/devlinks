import NextLink, { type LinkProps } from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

type TLinkProps = LinkProps & {
	children: React.ReactNode;
	className?: string;
};

export default function Link({ children, className, ...props }: TLinkProps) {
	return (
		<NextLink
			{...props}
			className={cn('hover:text-primary flex max-w-fit items-center gap-2 text-sm', className)}
		>
			{children}
		</NextLink>
	);
}
