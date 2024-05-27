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

import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useProfileContext } from '@/contexts/profile-context';
import { User } from '@/lib/types';

const profileDetailsFormSchema = z.object({
	name: z.string().max(100),
	email: z.string().email({ message: 'Please enter a valid email address' }).max(100)
});

export type TProfileDetailsForm = z.infer<typeof profileDetailsFormSchema>;

export default function ProfileDetailsForm() {
	const { user, handleChangeUserDetails } = useProfileContext();

	const form = useForm<TProfileDetailsForm>({
		resolver: zodResolver(profileDetailsFormSchema),
		defaultValues: {
			name: user.name,
			email: user.email
		}
	});

	const {
		reset,
		setError,
		watch,
		formState: { isSubmitting, isDirty }
	} = form;

	const onSubmit = (values: TProfileDetailsForm) => {
		console.log(values);
	};

	useEffect(() => {
		const subscription = watch(({ name, email }) => {
			handleChangeUserDetails(name as User['name'], email as User['email']);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='bg-muted grid gap-4 rounded-lg p-4 pb-6 pt-4'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='md:flex md:items-center'>
							<FormLabel className='md:min-w-60 lg:min-w-80'>Name*</FormLabel>
							<FormControl>
								<FormInput placeholder='John Doe' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='md:flex md:items-center'>
							<FormLabel className='md:min-w-60 lg:min-w-80'>Email*</FormLabel>
							<FormControl>
								<FormInput placeholder='someone@example.com' {...field} />
							</FormControl>
							<FormMessage />
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
