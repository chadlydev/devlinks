import { IconProps } from './';

export function AccountIcon({ size = 24, role, ...props }: IconProps) {
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
					<circle cx={12} cy={12} r={10}></circle>
					<circle cx={12} cy={10} r={3}></circle>
					<path d='M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662'></path>
				</g>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
