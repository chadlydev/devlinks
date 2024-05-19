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
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyEmailFormSchema } from '@/lib/zod';
import { z } from 'zod';

type TVerifyEmailForm = z.infer<typeof verifyEmailFormSchema>;

export default function VerifyEmailForm() {
	const form = useForm<TVerifyEmailForm>({
		resolver: zodResolver(verifyEmailFormSchema),
		defaultValues: {
			code: ''
		}
	});

	const {
		formState: { isSubmitting, isDirty, isValid }
	} = form;

	const onSubmit = async (values: TVerifyEmailForm) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
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
				<Button disabled={isSubmitting || !isDirty || !isValid}>Verify Email</Button>
				<Button variant='link' type='button' className='-mb-4 -mt-2'>
					Request new verification code in 59s
				</Button>
			</form>
		</Form>
	);
}
