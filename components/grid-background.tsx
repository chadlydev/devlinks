import React from 'react';
import { cn } from '@/lib/utils';

type GridBackgroundProps = React.HTMLAttributes<HTMLDivElement>;

export default function GridBackground({ className, ...props }: GridBackgroundProps) {
	return (
		<div
			className={cn(
				'dark:bg-grid-white/[0.1] bg-grid-black/[0.1] absolute left-0 top-0 -z-10 h-full w-full',
				className
			)}
			{...props}
		>
			<div className='bg-background pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]' />
		</div>
	);
}
