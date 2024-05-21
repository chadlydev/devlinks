import { IconProps } from './';

export function EyeIcon({ size = 24, role, ...props }: IconProps) {
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
					<path d='M2 12s3-7 10-7s10 7 10 7s-3 7-10 7s-10-7-10-7'></path>
					<circle cx={12} cy={12} r={3}></circle>
				</g>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
