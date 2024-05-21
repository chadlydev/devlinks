import Header from '@/app/(marketing)/header';
import { H1, H2, Large, Lead, Muted, Small } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROUTE_SIGN_UP } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import {
	DrizzleIcon,
	LuciaIcon,
	NextjsIcon,
	ReactIcon,
	ShadcnIcon,
	StripeIcon
} from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';
import { LogoIcon } from '@/components/icons/logo-icon';
import GridBackground from '@/components/grid-background';
import ThemeDropdownMenu from '@/components/theme-dropdown-menu';

const features = [
	{
		name: 'Next.js 14',
		description:
			'Efficient React framework for scalable applications, boosting productivity with modern features.',
		icon: <NextjsIcon size={36} />
	},
	{
		name: 'React 18',
		description:
			'Cutting-edge library for interactive UIs, optimizing performance with concurrent mode and automatic batching.',
		icon: <ReactIcon size={36} />
	},
	{
		name: 'Database',
		description:
			'Streamlined data management with DrizzleORM and robust, efficient databases with Vercel Postgres.',
		icon: <DrizzleIcon size={36} />
	},
	{
		name: 'Components',
		description:
			'Rapid UI development with accessible components from shadcn/ui and powerful, utility-first styling from TailwindCSS.',
		icon: <ShadcnIcon size={36} />
	},
	{
		name: 'Authentication',
		description:
			'Reliable and secure authentication, simplifying user management with comprehensive features.',
		icon: <LuciaIcon size={36} />
	},
	{
		name: 'Payments',
		description:
			'Comprehensive support for handling payments and managing subscriptions effortlessly with Stripe.',
		icon: <StripeIcon size={36} />
	}
];

export default function MarketingPage() {
	return (
		<main className='flex min-h-svh flex-col'>
			<Header />
			<section className='py-28'>
				<div className='container flex w-fit max-w-3xl flex-col items-center gap-4 px-4 text-center md:px-8'>
					<Badge variant='outline'>Maximize your impact</Badge>
					<H1>Interact with the developer community in a completely new way.</H1>
					<Lead>
						Elevate your online persona with our tailor-made profiles and instant link sharing.
						Display your achievements, engage with future employers and partners, and propel your
						professional journey forward!
					</Lead>
					<div className='flex gap-3'>
						<Button asChild>
							<Link href={ROUTE_SIGN_UP}>Get Started</Link>
						</Button>
						<Button asChild variant='outline'>
							<Link href='https://github.com/chadlydev' target='_blank'>
								GitHub
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* FEATURES SECTION */}
			<section className='bg-background/60 relative py-32' id='features'>
				<GridBackground className='dark:bg-grid-white/[0.2] bg-grid-black/[0.2]' />
				<div className='container flex flex-col gap-6 px-4 text-center md:px-8'>
					<div className='mx-auto max-w-3xl'>
						<H2>Techstack</H2>
						<Lead className='text-lg'>
							Explore the features that define this Next.js 14 project, showcasing advanced user
							management, streamlined database interactions, efficient UI development, and secure
							payment handling.
						</Lead>
					</div>
					<div className='mx-auto grid w-full justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-3'>
						{features.map((feature, i) => (
							<Card
								key={i}
								className='bg-background relative overflow-clip rounded-lg border p-2 text-left'
							>
								<CardContent className='flex max-h-[220px] w-full flex-col gap-4 rounded-md p-6'>
									{feature.icon}
									<div className='space-y-2'>
										<Large>{feature.name}</Large>
										<Muted>{feature.description}</Muted>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className='flex flex-col gap-6  py-32 text-center ' id='features'>
				<div className='container max-w-2xl'>
					<H2>Your Page, Tailored to Your Preferences</H2>
					<Lead className='px-4 text-lg'>
						Make your profile pop by altering the background colors and gradients, introducing your
						own photo. Give a unique flair to your link buttons, making them truly your own with
						custom shape and color.
					</Lead>
					{/* TODO add previews */}
				</div>
			</section>

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
					. Inspired by{' '}
					<Link
						href='https://github.com/shadcn'
						target='_blank'
						className='underline underline-offset-4'
					>
						shadcn
					</Link>
					. Hosted on{' '}
					<Link href='https://vercel.com/' target='_blank' className='underline underline-offset-4'>
						Vercel
					</Link>
					. The source code is available on{' '}
					<Link
						href='https://github.com/chadlydev'
						target='_blank'
						className='underline underline-offset-4'
					>
						GitHub
					</Link>
					.
				</Small>
				<ThemeDropdownMenu />
			</footer>
		</main>
	);
}
