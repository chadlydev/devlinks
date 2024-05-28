'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailFormSchema } from '@/lib/zod';
import { z } from 'zod';
import { requestEmailChangeAction } from './actions';
import {
	Form,
	FormControl,
	FormField,
	FormInput,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { toast } from 'sonner';

type TRequestEmailChangeForm = z.infer<typeof emailFormSchema>;

export default function RequestEmailChangeForm({ email }: { email: string }) {
	const [showForm, setShowForm] = useState(false);

	const form = useForm<TRequestEmailChangeForm>({
		resolver: zodResolver(emailFormSchema),
		defaultValues: {
			email: email
		}
	});

	const {
		reset,
		formState: { isSubmitting, isDirty }
	} = form;

	const onSubmit = async (formData: TRequestEmailChangeForm) => {
		const result = await requestEmailChangeAction(formData, email);
		if (result.error) {
			toast.error(result.error);
			reset();
		} else if (result.success) {
			setShowForm(false);
			toast.success(result.success);
		}
	};

	const handleClick = () => setShowForm(true);

	return (
		<>
			{!showForm ? (
				<Button onClick={handleClick} variant='secondary'>
					Change email address
				</Button>
			) : (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<FormInput placeholder='example@example.com' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button disabled={isSubmitting || !isDirty}>Submit</Button>
					</form>
				</Form>
			)}
		</>
	);
}
