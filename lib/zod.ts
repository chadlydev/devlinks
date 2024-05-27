import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address' }).max(100),
	password: z
		.string()
		.min(8, { message: 'Must contain at least 8 character(s)' })
		.max(100, { message: 'Cannot exceed 100 character(s)' })
});

export const signUpFormSchema = loginFormSchema
	.extend({
		confirmPassword: z
			.string()
			.min(8, { message: 'Must contain at least 8 character(s)' })
			.max(100, { message: 'Cannot exceed 100 character(s)' })
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Passwords do not match'
	});

export const verifyEmailFormSchema = z.object({
	code: z.string().length(8, { message: 'Your verification code must be 8 characters' })
});

export const emailFormSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address' }).max(100)
});

export const resetPasswordFormSchema = z
	.object({
		password: z
			.string()
			.min(8, { message: 'Must contain at least 8 character(s)' })
			.max(100, { message: 'Cannot exceed 100 character(s)' }),
		confirmPassword: z
			.string()
			.min(8, { message: 'Must contain at least 8 character(s)' })
			.max(100, { message: 'Cannot exceed 100 character(s)' })
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Passwords do not match'
	});

export const profilePictureFormSchema = z.object({
	image: z.instanceof(File).optional()
});

export const profileDetailsFormSchema = z.object({
	name: z
		.string()
		.max(100)
		.refine((value) => /^[A-Za-z\s]+$/.test(value), {
			message: "Name can't have symbols or numbers."
		}),
	email: z.string().email({ message: 'Please enter a valid email address' }).max(100)
});
