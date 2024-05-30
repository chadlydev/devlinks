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
import { changeEmailFormSchema, verifyEmailFormSchema } from '@/lib/zod';
import { requestEmailChangeAction, verifyEmailChangeAction } from '@/app/(app)/app/actions';
import { toast } from 'sonner';
import { useSessionContext } from '@/contexts/session-context';
import { SetStateAction, useState } from 'react';
import { Muted } from '@/components/typography';
import { useRouter } from 'next/navigation';

export default function ChangeEmailForm() {
	const [showVerification, setShowVerification] = useState(false);

	if (!showVerification) {
		return <RequestEmailChangeForm setShowVerification={setShowVerification} />;
	}
	return <VerifyEmailChangeForm setShowVerification={setShowVerification} />;
}

type TChangeEmailForm = z.infer<typeof changeEmailFormSchema>;

function RequestEmailChangeForm({
	setShowVerification
}: {
	setShowVerification: (value: SetStateAction<boolean>) => void;
}) {
	const { user } = useSessionContext();

	const form = useForm<TChangeEmailForm>({
		resolver: zodResolver(changeEmailFormSchema),
		defaultValues: {
			password: '',
			email: user?.email || ''
		}
	});

	const {
		reset,
		setError,
		resetField,
		formState: { isSubmitting, isDirty }
	} = form;

	const onSubmit = async (values: TChangeEmailForm) => {
		const result = await requestEmailChangeAction(values);

		if (result.type === 'invalid-password') {
			resetField('password');
			setError('password', { message: result.error });
		} else if (result.type === 'email-not-available') {
			setError('email', { message: result.error });
		} else if (result.error) {
			toast.error(result.error);
		} else if (result.success) {
			toast.success(result.success);
			setShowVerification(true);
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

type TVerifyEmailChangeForm = z.infer<typeof verifyEmailFormSchema>;

function VerifyEmailChangeForm({
	setShowVerification
}: {
	setShowVerification: (value: SetStateAction<boolean>) => void;
}) {
	const router = useRouter();

	const form = useForm<TVerifyEmailChangeForm>({
		resolver: zodResolver(verifyEmailFormSchema),
		defaultValues: {
			code: ''
		}
	});

	const {
		reset,
		formState: { isSubmitting, isDirty, isValid }
	} = form;

	const onSubmit = async (formData: TVerifyEmailChangeForm) => {
		const result = await verifyEmailChangeAction(formData);
		if (result.error) {
			toast.error(result.error);
			reset();
		} else if (result.success) {
			toast.success(result.success);
			setShowVerification(false);
			router.refresh();
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
				<Muted>Enter your 8-digit code below to confirm your email change</Muted>
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
				<Button disabled={isSubmitting || !isDirty || !isValid}>Submit</Button>
			</form>
		</Form>
	);
}
