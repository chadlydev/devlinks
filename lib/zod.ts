import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address' }).max(100),
	password: z
		.string()
		.min(8, { message: 'Must contain at least 8 character(s)' })
		.max(100, { message: 'Cannot exceed 100 character(s)' })
});
