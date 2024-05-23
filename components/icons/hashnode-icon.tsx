import { IconProps } from './';

export function HashnodeIcon({ size = 24, role, ...props }: IconProps) {
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
					d='m22.351 8.019l-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962M12 15.953a3.953 3.953 0 1 1 0-7.906a3.953 3.953 0 0 1 0 7.906'
				></path>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
