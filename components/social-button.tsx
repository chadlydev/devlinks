import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from '@/components/icons';
import { socialPlatformIcons, socialPlatformText } from '@/lib/constants';

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
const buttonVariants = cva(
	'ring-offset-background focus-visible:ring-ring inline-flex h-10 w-full flex-shrink-0 items-center justify-start gap-2.5 whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				github: 'bg-github text-white hover:bg-github/80',
				x: 'bg-x text-white hover:bg-x/50',
				linkedin: 'bg-linkedin text-white hover:bg-linkedin/80',
				youtube: 'bg-youtube text-white hover:bg-youtube/80',
				facebook: 'bg-facebook text-white hover:bg-facebook/80',
				twitch: 'bg-twitch text-white hover:bg-twitch/80',
				devto: 'bg-devto text-white hover:bg-devto/50',
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
		const Icon = socialPlatformIcons[variant!];
		const text = socialPlatformText[variant!];

		return (
			<button className={cn(buttonVariants({ variant, className }))} ref={ref} {...props}>
				<Icon size={16} />
				{text}
				<ArrowRightIcon size={16} className='ml-auto' />
			</button>
		);
	}
);
SocialButton.displayName = 'Button';

export { SocialButton };
