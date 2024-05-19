import { IconProps } from './';

export function HomeIcon({ size = 24, role, ...props }: IconProps) {
	return (
		<>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width={size}
				height={size}
				viewBox='0 0 24 24'
				{...props}
			>
				<g
					fill='none'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
				>
					<path d='m3 9l9-7l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
					<path d='M9 22V12h6v10'></path>
				</g>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
