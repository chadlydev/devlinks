'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { logoutAction } from '@/app/(app)/app/actions';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		startTransition(async () => {
			const result = await logoutAction();

			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
			}
		});
	};

	return (
		<Button onClick={handleClick} disabled={isPending}>
			Logout
		</Button>
	);
}
