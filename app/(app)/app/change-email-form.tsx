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

export type TChangeEmailForm = z.infer<typeof changeEmailFormSchema>;

export default function ChangeEmailForm() {
	const form = useForm<TChangeEmailForm>({
		resolver: zodResolver(changeEmailFormSchema),
		defaultValues: {
			password: '',
			email: ''
		}
	});

	const {
		reset,
		setError,
		formState: { isSubmitting, isDirty }
	} = form;

	const onSubmit = (formData: TChangeEmailForm) => {
		console.log(formData);
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
