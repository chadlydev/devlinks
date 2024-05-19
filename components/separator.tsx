import React from 'react';

export default function Separator({ children }: { children?: React.ReactNode }) {
	return (
		<div className='flex items-center gap-2'>
			<hr className='border-1 flex-grow' />
			{children ? (
				<span className='text-muted-foreground text-xs uppercase'>{children}</span>
			) : null}
			<hr className='border-1 flex-grow' />
		</div>
	);
}
