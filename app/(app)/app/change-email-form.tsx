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

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { changeEmailFormSchema } from '@/lib/zod';
import { changeEmailAction } from '@/app/(app)/app/actions';
import { toast } from 'sonner';
import { useSessionContext } from '@/contexts/session-context';

type TChangeEmailForm = z.infer<typeof changeEmailFormSchema>;

export default function ChangeEmailForm() {
	const { user } = useSessionContext();

	if (!user) return;

	const form = useForm<TChangeEmailForm>({
		resolver: zodResolver(changeEmailFormSchema),
		defaultValues: {
			password: '',
			email: user.email
		}
	});

	const {
		reset,
		setError,
		resetField,
		formState: { isSubmitting, isDirty }
	} = form;

	const onSubmit = async (values: TChangeEmailForm) => {
		const result = await changeEmailAction(values);

		if (result.error) {
			resetField('password');
			setError('password', { message: result.error });
		} else if (result.success) {
			toast.success(result.success);
			reset();
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password*</FormLabel>
							<FormControl>
								<FormInput
									type='password'
									placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email*</FormLabel>
							<FormControl>
								<FormInput placeholder='someone@example.com' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button variant='secondary' disabled={isSubmitting || !isDirty}>
					Save changes
				</Button>
			</form>
		</Form>
	);
}
