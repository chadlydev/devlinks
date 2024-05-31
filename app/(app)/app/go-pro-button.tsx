'use client';

import { StarsIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { createCheckoutSessionAction } from '@/app/(app)/app/actions';
import { toast } from 'sonner';

export default function GoProButton() {
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		startTransition(async () => {
			const result = await createCheckoutSessionAction();

			if (result.error) {
				toast.error(result.error);
			}
		});
	};

	return (
		<Button onClick={handleClick} disabled={isPending} variant='secondary' size='sm'>
			<StarsIcon size={16} /> GO PRO
			<StarsIcon size={16} />
		</Button>
	);
}
