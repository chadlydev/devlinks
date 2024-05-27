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
import { Large } from '@/components/typography';
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

	const onSubmit = (values: TChangeEmailForm) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='bg-muted grid gap-4 rounded-lg p-4 pb-6 pt-4'
			>
				<Large>Change Email</Large>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem className='md:flex md:items-center'>
							<FormLabel className='md:min-w-60 lg:min-w-80'>Password*</FormLabel>
							<div className='flex flex-grow flex-col gap-2'>
								<FormControl>
									<FormInput
										type='password'
										placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='md:flex md:items-center'>
							<FormLabel className='md:min-w-60 lg:min-w-80'>Email*</FormLabel>
							<div className='flex flex-grow flex-col gap-2'>
								<FormControl>
									<FormInput placeholder='someone@example.com' {...field} />
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>

				<Button
					className='md:ml-auto md:w-[calc(100%-248px)] lg:w-[calc(100%-328px)]'
					variant='secondary'
					disabled={isSubmitting || !isDirty}
				>
					Save changes
				</Button>
			</form>
		</Form>
	);
}
