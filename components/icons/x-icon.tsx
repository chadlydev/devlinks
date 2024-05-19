import { IconProps } from './';

export function XIcon({ size = 24, role, ...props }: IconProps) {
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
					d='M18 6L6 18M6 6l12 12'
				></path>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
