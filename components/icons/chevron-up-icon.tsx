import { IconProps } from './';

export function ChevronUpIcon({ size = 24, role, ...props }: IconProps) {
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
					d='m18 15l-6-6l-6 6'
				></path>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
