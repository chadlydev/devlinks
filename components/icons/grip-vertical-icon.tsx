import { IconProps } from './';

export function GripVerticalIcon({ size = 24, role, ...props }: IconProps) {
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
					<circle cx={9} cy={12} r={1}></circle>
					<circle cx={9} cy={5} r={1}></circle>
					<circle cx={9} cy={19} r={1}></circle>
					<circle cx={15} cy={12} r={1}></circle>
					<circle cx={15} cy={5} r={1}></circle>
					<circle cx={15} cy={19} r={1}></circle>
				</g>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
