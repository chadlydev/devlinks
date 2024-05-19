import { IconProps } from './';

export function ChevronDownIcon({ size = 24, role, ...props }: IconProps) {
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
					d='m6 9l6 6l6-6'
				></path>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
