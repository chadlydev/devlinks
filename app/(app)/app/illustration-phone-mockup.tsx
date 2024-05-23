import { Large, Small } from '@/components/typography';
import { SocialButton } from '@/components/social-button';

export default function IllustrationPhoneMockup() {
	return (
		<div className='relative'>
			<svg
				width='308'
				height='632'
				viewBox='0 0 308 632'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g clipPath='url(#illustration-phone-mockup 1__a)'>
					<path
						d='M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z'
						className='stroke-border fill-background'
					/>
					<path
						d='M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z'
						className='stroke-border fill-card dark:fill-card-foreground/10'
					/>
					{/*<path*/}
					{/*	d='M153.5 160c26.51 0 48-21.49 48-48s-21.49-48-48-48-48 21.49-48 48 21.49 48 48 48Zm72 25h-144a8 8 0 0 0 0 16h144a8 8 0 0 0 0-16Zm-40 29h-64a4 4 0 0 0 0 8h64a4 4 0 0 0 0-8Zm78.5 64H43a8 8 0 0 0-8 8v28a8 8 0 0 0 8 8h221a8 8 0 0 0 8-8v-28a8 8 0 0 0-8-8Zm0 64H43a8 8 0 0 0-8 8v28a8 8 0 0 0 8 8h221a8 8 0 0 0 8-8v-28a8 8 0 0 0-8-8Zm0 64H43a8 8 0 0 0-8 8v28a8 8 0 0 0 8 8h221a8 8 0 0 0 8-8v-28a8 8 0 0 0-8-8Zm0 64H43a8 8 0 0 0-8 8v28a8 8 0 0 0 8 8h221a8 8 0 0 0 8-8v-28a8 8 0 0 0-8-8Zm0 64H43a8 8 0 0 0-8 8v28a8 8 0 0 0 8 8h221a8 8 0 0 0 8-8v-28a8 8 0 0 0-8-8Z'*/}
					{/*	className='fill-muted'*/}
					{/*/>*/}
				</g>
			</svg>

			<div className='absolute top-0 flex w-[306px] flex-grow flex-col items-center gap-12 px-10 pt-16'>
				<div className='flex flex-col items-center gap-5'>
					<div className='size-24 rounded-full border bg-white' />
					<div className='flex flex-col items-center gap-2'>
						<Large>Chadly Riedewald</Large>
						<Small>hi@chadly.dev</Small>
					</div>
				</div>

				<div className='flex w-full flex-col items-center gap-6'>
					<SocialButton variant='github' />
					<SocialButton variant='x' />
					<SocialButton variant='linkedin' />
					<SocialButton variant='youtube' />
					<SocialButton variant='twitch' />
					{/*<SocialButton variant='devto' />*/}
					{/*<SocialButton variant='codewars' />*/}
					{/*<SocialButton variant='freecodecamp' />*/}
					{/*<SocialButton variant='gitlab' />*/}
					{/*<SocialButton variant='hashnode' />*/}
					{/*<SocialButton variant='stackoverflow' />*/}
				</div>
			</div>
		</div>
	);
}
