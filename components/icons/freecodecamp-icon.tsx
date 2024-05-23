import { IconProps } from './';

export function FreecodecampIcon({ size = 24, role, ...props }: IconProps) {
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
					d='M19.885 3.906a.62.62 0 0 0-.354.12c-.08.08-.161.196-.161.313c0 .2.236.474.673.923c1.822 1.754 2.738 3.903 2.732 6.494c-.007 2.867-.97 5.17-2.844 6.954c-.394.353-.556.63-.557.867c0 .116.08.237.16.353a.58.58 0 0 0 .353.162c.434 0 1.04-.512 1.833-1.509c1.542-1.89 2.24-3.978 2.279-6.824c.036-2.847-.857-4.777-2.603-6.77c-.63-.712-1.153-1.082-1.511-1.083m-15.769.002c-.358 0-.882.37-1.51 1.083C.858 6.984-.035 8.914.001 11.761c.04 2.846.737 4.933 2.28 6.824c.791.997 1.398 1.51 1.832 1.509a.57.57 0 0 0 .352-.162c.08-.116.16-.237.16-.353c0-.237-.162-.514-.556-.866c-1.873-1.785-2.837-4.087-2.844-6.955c-.006-2.591.91-4.74 2.732-6.494c.437-.449.674-.722.673-.923c0-.117-.08-.233-.161-.313a.62.62 0 0 0-.354-.12zm7.056.895s.655 2.081-2.649 6.727c-3.156 4.433 1.045 7.15 1.432 7.386c-.281-.18-2.001-1.5.402-5.423c.466-.77 1.076-1.47 1.834-3.041c0 0 .67.946.32 2.998c-.523 3.101 2.271 2.214 2.314 2.257c.976 1.15-.808 3.17-.917 3.233c-.108.061 5.096-3.13 1.399-7.935c-.253.253-.582 1.442-1.267 1.266c-.684-.174 2.125-3.494-2.868-7.468M9.955 18.916q.036.024.038.024z'
				></path>
			</svg>
			{role && <span className='sr-only'>{role}</span>}
		</>
	);
}
