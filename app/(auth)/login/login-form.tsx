'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { loginFormSchema } from '@/lib/zod';
import { ROUTE_RESET_PASSWORD } from '@/lib/constants';
import { loginAction } from '@/app/(auth)/login/actions';
import { toast } from 'sonner';

type TLoginForm = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
	const form = useForm<TLoginForm>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const {
		reset,
		formState: { isSubmitting, isDirty }
	} = form;

	const onSubmit = async (values: TLoginForm) => {
		const result = await loginAction(values);
		if (result.error) {
			toast.error(result.error);
			reset();
		} else if (result.success) {
			toast.success(result.success);
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

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<div className='flex items-center'>
								<FormLabel>Password</FormLabel>
								<Link
									href={ROUTE_RESET_PASSWORD}
									className='ml-auto inline-block text-xs underline'
								>
									Forgot your password?
								</Link>
							</div>
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

				<Button disabled={isSubmitting || !isDirty}>Login</Button>
			</form>
		</Form>
	);
}
