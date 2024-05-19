import { IconProps } from './';

export function MenuIcon({ size = 24, role, ...props }: IconProps) {
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
					fill='none'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M4 12h16M4 6h16M4 18h16'
				></path>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
