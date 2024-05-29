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
import { changePasswordFormSchema } from '@/lib/zod';
import { toast } from 'sonner';
import { changePasswordAction } from '@/app/(app)/app/actions';

export type TChangePasswordForm = z.infer<typeof changePasswordFormSchema>;

export default function ChangePasswordForm() {
	const form = useForm<TChangePasswordForm>({
		resolver: zodResolver(changePasswordFormSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
		}
	});

	const {
		reset,
		resetField,
		setError,
		formState: { isSubmitting, isDirty }
	} = form;

	const onSubmit = async (values: TChangePasswordForm) => {
		const result = await changePasswordAction(values);

		if (result.error) {
			resetField('currentPassword');
			setError('currentPassword', { message: result.error });
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
					name='currentPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Current password*</FormLabel>
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
					name='newPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>New password*</FormLabel>
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
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm new password*</FormLabel>
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
				<Button variant='secondary' disabled={isSubmitting || !isDirty}>
					Save changes
				</Button>
			</form>
		</Form>
	);
}
