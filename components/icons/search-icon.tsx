import { IconProps } from './';

export function SearchIcon({ size = 24, role, ...props }: IconProps) {
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
					<circle cx={11} cy={11} r={8}></circle>
					<path d='m21 21l-4.3-4.3'></path>
				</g>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
