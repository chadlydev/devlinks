import React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

type H1Props = React.HTMLAttributes<HTMLHeadingElement> & {
	asChild?: boolean;
};

const H1 = React.forwardRef<HTMLHeadingElement, H1Props>(
	({ className, children, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'h1';
		return (
			<Comp
				ref={ref}
				className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
				{...props}
			>
				{children}
			</Comp>
		);
	}
);
H1.displayName = 'H1';

type H2Props = React.HTMLAttributes<HTMLHeadingElement> & {
	asChild?: boolean;
};

const H2 = React.forwardRef<HTMLHeadingElement, H2Props>(
	({ className, children, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'h2';
		return (
			<Comp
				ref={ref}
				className={cn(
					'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
					className
				)}
				{...props}
			>
				{children}
			</Comp>
		);
	}
);
H2.displayName = 'H2';

type H3Props = React.HTMLAttributes<HTMLHeadingElement> & {
	asChild?: boolean;
};

const H3 = React.forwardRef<HTMLHeadingElement, H3Props>(
	({ className, children, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'h3';
		return (
			<Comp
				ref={ref}
				className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}
				{...props}
			>
				{children}
			</Comp>
		);
	}
);
H3.displayName = 'H3';

type H4Props = React.HTMLAttributes<HTMLHeadingElement> & {
	asChild?: boolean;
};

const H4 = React.forwardRef<HTMLHeadingElement, H4Props>(
	({ className, children, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'h4';
		return (
			<Comp
				ref={ref}
				className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}
				{...props}
			>
				{children}
			</Comp>
		);
	}
);
H4.displayName = 'H4';

type PProps = React.HTMLAttributes<HTMLParagraphElement> & {
	asChild?: boolean;
};

const P = React.forwardRef<HTMLParagraphElement, PProps>(
	({ className, children, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'p';
		return (
			<Comp ref={ref} className={cn('leading-7', className)} {...props}>
				{children}
			</Comp>
		);
	}
);
P.displayName = 'P';

type CodeProps = React.HTMLAttributes<HTMLElement> & {
	asChild?: boolean;
};

const Code = React.forwardRef<HTMLElement, CodeProps>(
	({ className, children, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'code';
		return (
			<Comp
				ref={ref}
				className={cn(
					'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
					className
				)}
				{...props}
			>
				{children}
			</Comp>
		);
	}
);
Code.displayName = 'Code';

type LeadProps = React.HTMLAttributes<HTMLParagraphElement> & {
	asChild?: boolean;
};

const Lead = React.forwardRef<HTMLParagraphElement, LeadProps>(
	({ className, children, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'p';
		return (
			<Comp ref={ref} className={cn('text-muted-foreground text-xl', className)} {...props}>
				{children}
			</Comp>
		);
	}
);
Lead.displayName = 'Lead';

type LargeProps = React.HTMLAttributes<HTMLParagraphElement> & {
	asChild?: boolean;
};

const Large = React.forwardRef<HTMLParagraphElement, LargeProps>(
	({ className, children, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'p';
		return (
			<Comp ref={ref} className={cn('text-lg font-semibold', className)} {...props}>
				{children}
			</Comp>
		);
	}
);
Large.displayName = 'Large';

type SmallProps = React.HTMLAttributes<HTMLElement> & {
	asChild?: boolean;
};

const Small = React.forwardRef<HTMLElement, SmallProps>(
	({ className, children, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'small';
		return (
			<Comp ref={ref} className={cn('text-sm font-medium leading-none', className)} {...props}>
				{children}
			</Comp>
		);
	}
);
Small.displayName = 'Small';

type MutedProps = React.HTMLAttributes<HTMLParagraphElement> & {
	asChild?: boolean;
};

const Muted = React.forwardRef<HTMLParagraphElement, MutedProps>(
	({ className, children, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'p';
		return (
			<Comp ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props}>
				{children}
			</Comp>
		);
	}
);
Muted.displayName = 'Muted';

export { H1, H2, H3, H4, P, Code, Lead, Large, Small, Muted };
