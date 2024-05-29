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
import { profileDetailsFormSchema } from '@/lib/zod';

export type TProfileDetailsForm = z.infer<typeof profileDetailsFormSchema>;

export default function ProfileDetailsForm() {
	const { user, handleChangeUserDetails } = useProfileContext();

	const form = useForm<TProfileDetailsForm>({
		resolver: zodResolver(profileDetailsFormSchema),
		defaultValues: {
			name: user.name!,
			displayEmail: user.displayEmail!
		}
	});

	const {
		reset,
		setError,
		watch,
		formState: { isSubmitting, isDirty }
	} = form;

	const onSubmit = (formData: TProfileDetailsForm) => {
		console.log(formData);
	};

	useEffect(() => {
		const subscription = watch(({ name, displayEmail }) => {
			handleChangeUserDetails(name as User['name'], displayEmail as User['displayEmail']);
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
							<FormLabel className='md:min-w-60 lg:min-w-80'>Display name*</FormLabel>
							<div className='flex flex-grow flex-col gap-2'>
								<FormControl>
									<FormInput placeholder='John Doe' {...field} />
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='displayEmail'
					render={({ field }) => (
						<FormItem className='md:flex md:items-center'>
							<FormLabel className='md:min-w-60 lg:min-w-80'>Display email*</FormLabel>
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
