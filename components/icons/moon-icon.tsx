import { IconProps } from './';

export function MoonIcon({ size = 24, role, ...props }: IconProps) {
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
					d='M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9'
				></path>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
