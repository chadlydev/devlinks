import { IconProps } from './';

export function NextjsIcon({ size = 24, role, ...props }: IconProps) {
	return (
		<>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width={size}
				height={size}
				viewBox='0 0 24 24'
				{...props}
			>
				<path
					fill='currentColor'
					d='M18.665 21.978A11.94 11.94 0 0 1 12 24C5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251zm-3.332-8.533l1.6 2.061V7.2h-1.6z'
				></path>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
