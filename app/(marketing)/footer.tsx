import { LogoIcon } from '@/components/icons/logo-icon';
import { Small } from '@/components/typography';
import Link from 'next/link';
import ThemeDropdownMenu from '@/components/theme-dropdown-menu';

export default function Footer() {
	return (
		<footer className='container mt-auto flex flex-col items-center gap-4 px-4 py-6 text-center md:flex-row md:px-8'>
			<LogoIcon />
			<Small className='leading-7 md:mr-auto md:text-left'>
				Built by{' '}
				<Link
					href='https://github.com/chadlydev'
					target='_blank'
					className='underline underline-offset-4'
				>
					chadlydev
				</Link>
				. Hosted on{' '}
				<Link href='https://vercel.com/' target='_blank' className='underline underline-offset-4'>
					Vercel
				</Link>
				. The source code is available on{' '}
				<Link
					href='https://github.com/chadlydev/devlinks'
					target='_blank'
					className='underline underline-offset-4'
				>
					GitHub
				</Link>
				.
			</Small>
			<ThemeDropdownMenu />
		</footer>
	);
}
