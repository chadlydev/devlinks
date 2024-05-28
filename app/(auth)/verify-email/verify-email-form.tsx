'use client';

import {
	Form,
	FormControl,
	FormField,
	FormInput,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyEmailFormSchema } from '@/lib/zod';
import { z } from 'zod';
import { ResendEmailVerificationButton } from '@/app/(auth)/verify-email/resend-email-verification-button';
import { verifyEmailAction } from '@/app/(auth)/verify-email/actions';
import { toast } from 'sonner';

type TVerifyEmailForm = z.infer<typeof verifyEmailFormSchema>;

export default function VerifyEmailForm() {
	const form = useForm<TVerifyEmailForm>({
		resolver: zodResolver(verifyEmailFormSchema),
		defaultValues: {
			code: ''
		}
	});

	const {
		reset,
		formState: { isSubmitting, isDirty, isValid }
	} = form;

	const onSubmit = async (formData: TVerifyEmailForm) => {
		const result = await verifyEmailAction(formData);
		if (result.error) {
			toast.error(result.error);
			reset();
		} else if (result.success) {
			toast.success(result.success);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
				<FormField
					control={form.control}
					name='code'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Code</FormLabel>
							<FormControl>
								<FormInput type='number' placeholder='12345678' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isSubmitting || !isDirty || !isValid}>Verify Email</Button>
				<ResendEmailVerificationButton />
			</form>
		</Form>
	);
}
