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
import { TUser } from '@/lib/types';
import { profileDetailsFormSchema } from '@/lib/zod';
import { toast } from 'sonner';
import { updateProfileDetailsAction } from '@/app/(app)/app/profile-details/actions';
import { useRouter } from 'next/navigation';

export type TProfileDetailsForm = z.infer<typeof profileDetailsFormSchema>;

export default function ProfileDetailsForm() {
	const { user, handleChangeUserDetails } = useProfileContext();
	const router = useRouter();

	const form = useForm<TProfileDetailsForm>({
		resolver: zodResolver(profileDetailsFormSchema),
		defaultValues: {
			url: user.url || '',
			name: user.name || '',
			displayEmail: user.displayEmail || ''
		}
	});

	const {
		watch,
		formState: { isSubmitting, isDirty }
	} = form;

	const onSubmit = async (formData: TProfileDetailsForm) => {
		const result = await updateProfileDetailsAction(formData);
		if (result.error) {
			toast.error(result.error);
		} else if (result.success) {
			toast.success(result.success);
			router.refresh();
		}
	};

	useEffect(() => {
		const subscription = watch(({ name, displayEmail }) => {
			handleChangeUserDetails(name as TUser['name'], displayEmail as TUser['displayEmail']);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	const isFreeUser = user.subscription !== 'pro';

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-4 rounded-lg bg-muted p-4 pb-6 pt-4'
			>
				<FormField
					control={form.control}
					name='url'
					render={({ field }) => (
						<FormItem className='md:flex md:items-center lg:gap-8 xl:gap-2'>
							<FormLabel className='md:min-w-60 lg:min-w-fit xl:min-w-80'>URL</FormLabel>
							<div className='flex flex-grow flex-col gap-2'>
								<FormControl>
									<FormInput placeholder='devlinks.dev/[url]' disabled={isFreeUser} {...field} />
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='md:flex md:items-center lg:gap-8 xl:gap-2'>
							<FormLabel className='md:min-w-60 lg:min-w-fit xl:min-w-80'>Display name*</FormLabel>
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
						<FormItem className='md:flex md:items-center lg:gap-8 xl:gap-2'>
							<FormLabel className='md:min-w-60 lg:min-w-fit xl:min-w-80'>Display email*</FormLabel>
							<div className='flex flex-grow flex-col gap-2'>
								<FormControl>
									<FormInput placeholder='someone@example.com' {...field} />
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>
				{isDirty && (
					<Button
						className='md:ml-auto md:w-[calc(100%-248px)] lg:w-[calc(100%-128px)] xl:w-[calc(100%-328px)]'
						variant='secondary'
						disabled={isSubmitting || !isDirty}
					>
						Save changes
					</Button>
				)}
			</form>
		</Form>
	);
}
