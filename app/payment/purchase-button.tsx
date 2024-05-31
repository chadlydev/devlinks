'use client';

import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createCheckoutSessionAction } from '@/app/payment/actions';

export default function PurchaseButton() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		startTransition(async () => {
			const result = await createCheckoutSessionAction();

			if (result.error) {
				toast.error(result.error);
			} else {
				router.refresh();
			}
		});
	};

	return (
		<Button onClick={handleClick} disabled={isPending} size='lg'>
			Buy lifetime access for $29
		</Button>
	);
}
