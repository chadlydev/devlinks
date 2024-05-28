'use client';

import { ROUTE_SIGN_UP } from '@/lib/constants';
import { redirect } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { cancelSignUpAction } from '@/app/(auth)/get-started/actions';
import Link from '@/components/link';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon } from '@/components/icons';

export default function CancelSignUpButton() {
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		startTransition(async () => {
			const result = await cancelSignUpAction();

			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.warning(result.success);
				redirect(ROUTE_SIGN_UP);
			}
		});
	};

	return (
		<Link
			onClick={handleClick}
			className={cn({ 'pointer-events-none': isPending })}
			aria-disabled={isPending}
			// tabIndex={isPending ? -1 : undefined}
			href={ROUTE_SIGN_UP}
		>
			<ArrowLeftIcon size={16} /> Back to signup
		</Link>
	);
}
