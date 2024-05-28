'use client';

import { useForm } from 'react-hook-form';
import { signUpFormSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Form, FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { signUpAction } from '@/app/(auth)/sign-up/actions';
import { toast } from 'sonner';

type TSignUpForm = z.infer<typeof signUpFormSchema>;

export default function SignUpForm() {
	const form = useForm<TSignUpForm>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: ''
		}
	});

	const {
		reset,
		formState: { isSubmitting, isDirty }
	} = form;

	const onSubmit = async (formData: TSignUpForm) => {
		const result = await signUpAction(formData);
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
							<FormLabel>Password</FormLabel>
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
							<FormLabel>Confirm Password</FormLabel>
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

				<Button disabled={isSubmitting || !isDirty}>Create an account</Button>
			</form>
		</Form>
	);
}
