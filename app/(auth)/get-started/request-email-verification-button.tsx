'use client';

import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { ROUTE_VERIFY_EMAIL } from '@/lib/constants';
import { sendEmailVerificationAction } from '@/app/(auth)/actions';

export default function RequestEmailVerificationButton() {
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		startTransition(async () => {
			const result = await sendEmailVerificationAction();

			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				redirect(ROUTE_VERIFY_EMAIL);
			}
		});
	};

	return (
		<Button onClick={handleClick} disabled={isPending}>
			Send verification code
		</Button>
	);
}
