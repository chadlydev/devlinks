import { useEffect, useState } from 'react';
import { useCountdown } from 'usehooks-ts';
import { EMAIL_VERIFICATION_TIMER } from '@/lib/constants';
import { sendEmailVerificationAction } from '@/app/(auth)/actions';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function ResendEmailVerificationButton() {
	const [disabled, setDisabled] = useState(false);
	const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
		countStart: EMAIL_VERIFICATION_TIMER,
		intervalMs: 1000
	});

	// Stop countdown on 0
	useEffect(() => {
		if (count === 0) {
			stopCountdown();
			resetCountdown();
			setDisabled(false);
		}
	}, [count]);

	const handleSendEmailVerification = async () => {
		startCountdown();
		setDisabled(true);

		const result = await sendEmailVerificationAction();
		if (result.error) {
			toast.error(result.error);
		} else if (result.success) {
			toast.success(result.success);
		}
	};

	// 	start countdown on render
	useEffect(() => {
		startCountdown();
		setDisabled(true);
	}, []);

	return (
		<Button
			variant='link'
			type='button'
			disabled={disabled || (count > 0 && count < EMAIL_VERIFICATION_TIMER)}
			onClick={handleSendEmailVerification}
			className='-mb-4 -mt-2'
		>
			Request new verification code{' '}
			{count > 0 && count < EMAIL_VERIFICATION_TIMER && `in ${count}s`}
		</Button>
	);
}
