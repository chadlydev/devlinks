import Link from 'next/link';
import { Code, H1, H2, H3, H4, Large, Lead, Muted, P, Small } from '@/components/typography';
import ThemeButton from '@/components/theme-button';

export default function HomePage() {
	return (
		<main>
			<ThemeButton />
			<H1>Home page</H1>
			<div className='flex flex-col gap-1'>
				<Link href='/login'>Login</Link>
				<Link href='/sign-up'>Sign up</Link>
				<Link href='/get-started'>Get started</Link>
				<Link href='/verify-email'>Verify Email</Link>
				<Link href='/reset-password'>Reset password</Link>
				<Link href='/reset-password/asdasdasd'>Reset password token</Link>
			</div>

			<div className='flex max-w-sm flex-col gap-1 pt-10'>
				<H1>Typography</H1>
				<H2>Heading 2</H2>
				<H3>Heading 3</H3>
				<H4>Heading 4</H4>
				<P>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis dolores dolorum ex
					fugiat in ipsa magnam nesciunt nostrum quaerat repellat.
				</P>
				<Code>chadlydev/devlinks</Code>
				<Lead>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet iure placeat quaerat
					repudiandae soluta. Asperiores at nemo neque. Architecto, rerum.
				</Lead>
				<Large>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet iure placeat quaerat
					repudiandae soluta. Asperiores at nemo neque. Architecto, rerum.
				</Large>
				<Small>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet iure placeat quaerat
					repudiandae soluta. Asperiores at nemo neque. Architecto, rerum.
				</Small>
				<Muted>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet iure placeat quaerat
					repudiandae soluta. Asperiores at nemo neque. Architecto, rerum.
				</Muted>
			</div>
		</main>
	);
}
