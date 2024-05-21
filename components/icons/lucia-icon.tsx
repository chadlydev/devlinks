import { IconProps } from './';

export function LuciaIcon({ size = 24, role, ...props }: IconProps) {
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
					fill='currentColor'
					d='M20.382 20.714L12 0L3.618 20.714L2.288 24h19.423zM12 13.61l-5.73 7.058l1.288-3.184L12 6.505l4.442 10.978l1.289 3.184z'
				></path>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
