import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
	ArrowRightIcon,
	CodewarsIcon,
	DevtoIcon,
	FacebookIcon,
	FreecodecampIcon,
	GithubIcon,
	GitlabIcon,
	HashnodeIcon,
	LinkedinIcon,
	StackoverflowIcon,
	TwitchIcon,
	XIcon,
	YoutubeIcon
} from '@/components/icons';
import { PlatformLabel, PlatformValue } from '@/lib/types';

type PlatformIcons = {
	[K in PlatformValue]?: any;
};

const platformIcons: PlatformIcons = {
	github: GithubIcon,
	x: XIcon,
	linkedin: LinkedinIcon,
	youtube: YoutubeIcon,
	facebook: FacebookIcon,
	twitch: TwitchIcon,
	devto: DevtoIcon,
	codewars: CodewarsIcon,
	freecodecamp: FreecodecampIcon,
	gitlab: GitlabIcon,
	hashnode: HashnodeIcon,
	stackoverflow: StackoverflowIcon
};

type PlatformLabels = {
	[K in PlatformValue]?: PlatformLabel;
};

const platformLabels: PlatformLabels = {
	github: 'GitHub',
	x: 'X',
	linkedin: 'LinkedIn',
	youtube: 'YouTube',
	facebook: 'Facebook',
	twitch: 'Twitch',
	devto: 'Dev.to',
	codewars: 'Codewars',
	freecodecamp: 'freeCodeCamp',
	gitlab: 'GitLab',
	hashnode: 'Hashnode',
	stackoverflow: 'Stack Overflow'
};

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
const buttonVariants = cva(
	'ring-offset-background focus-visible:ring-ring inline-flex h-10 w-full flex-shrink-0 items-center justify-start gap-2.5 whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				github: 'bg-github text-white hover:bg-github/80 dark:border',
				x: 'bg-x text-white hover:bg-x/80 dark:hover:bg-x/60 dark:border',
				linkedin: 'bg-linkedin text-white hover:bg-linkedin/80',
				youtube: 'bg-youtube text-white hover:bg-youtube/80',
				facebook: 'bg-facebook text-white hover:bg-facebook/80',
				twitch: 'bg-twitch text-white hover:bg-twitch/80',
				devto: 'bg-devto text-white hover:bg-devto/50 dark:border',
				codewars: 'bg-codewars text-white hover:bg-codewars/80',
				freecodecamp: 'bg-freecodecamp text-white hover:bg-freecodecamp/60',
				gitlab: 'bg-gitlab text-white hover:bg-gitlab/80',
				hashnode: 'bg-hashnode text-white hover:bg-hashnode/80',
				stackoverflow: 'bg-stackoverflow text-white hover:bg-stackoverflow/80'
			}
		},
		defaultVariants: {
			variant: 'github'
		}
	}
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	Omit<ButtonVariantProps, 'variant'> &
	Required<Pick<ButtonVariantProps, 'variant'>> & {};

const SocialButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, ...props }, ref) => {
		const Icon = platformIcons[variant!];
		const label = platformLabels[variant!];

		return (
			<button className={cn(buttonVariants({ variant, className }))} ref={ref} {...props}>
				<Icon size={16} />
				{label}
				<ArrowRightIcon size={16} className='ml-auto' />
			</button>
		);
	}
);
SocialButton.displayName = 'Button';

export { SocialButton };
