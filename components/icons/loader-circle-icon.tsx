import { IconProps } from './';

export function LoaderCircleIcon({ size = 24, role, ...props }: IconProps) {
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
					d='M21 12a9 9 0 1 1-6.219-8.56'
				></path>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
