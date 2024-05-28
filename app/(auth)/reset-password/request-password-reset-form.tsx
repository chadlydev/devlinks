'use client';

import { z } from 'zod';
import { emailFormSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { requestPasswordResetAction } from '@/app/(auth)/reset-password/actions';
import { toast } from 'sonner';

type TRequestPasswordResetForm = z.infer<typeof emailFormSchema>;

export default function RequestPasswordResetForm() {
	const form = useForm<TRequestPasswordResetForm>({
		resolver: zodResolver(emailFormSchema),
		defaultValues: {
			email: ''
		}
	});

	const {
		reset,
		formState: { isSubmitting, isDirty }
	} = form;

	const onSubmit = async (formData: TRequestPasswordResetForm) => {
		const result = await requestPasswordResetAction(formData);
		if (result.error) {
			toast.error(result.error);
			reset();
		} else if (result.success) {
			toast.info(result.success);
			reset();
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<FormInput placeholder='someone@example.com' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isSubmitting || !isDirty}>Submit</Button>
			</form>
		</Form>
	);
}
