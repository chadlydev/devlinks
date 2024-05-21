import { IconProps } from './';

export function PlusIcon({ size = 24, role, ...props }: IconProps) {
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
					d='M5 12h14m-7-7v14'
				></path>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
