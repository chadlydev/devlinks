'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormInput,
	FormItem,
	FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Small } from '@/components/typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AccountIcon } from '@/components/icons';
import { useProfileContext } from '@/contexts/profile-context';

const profilePictureFormSchema = z.object({
	image: z.instanceof(File).optional()
});

export type TProfilePictureForm = z.infer<typeof profilePictureFormSchema>;

export default function ProfilePictureForm() {
	const { user, handleChangeUserProfilePicture } = useProfileContext();
	const [file, setFile] = useState<File | null | undefined>(null);
	const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setFile(file);

		if (filePreviewUrl) {
			URL.revokeObjectURL(filePreviewUrl);
		}

		if (file) {
			const url = URL.createObjectURL(file);
			setFilePreviewUrl(url);
			handleChangeUserProfilePicture(url);
			console.log(user);
		} else {
			setFilePreviewUrl(null);
		}
	};

	const form = useForm<TProfilePictureForm>({
		resolver: zodResolver(profilePictureFormSchema)
	});

	const {
		reset,
		setError,
		formState: { isSubmitting }
	} = form;

	const onSubmit = async () => {
		console.log(file);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='bg-muted rounded-lg p-4 pb-6 pt-4'>
				<FormField
					control={form.control}
					name='image'
					render={({ field: { value, onChange, ...fieldProps } }) => (
						<FormItem className='flex flex-col gap-6 md:h-40 md:flex-row md:items-center md:gap-12'>
							<Small className='basis-1/3 font-semibold'>Profile picture</Small>
							<Avatar className='size-32 rounded-md'>
								<AvatarImage src={filePreviewUrl || undefined} />
								<AvatarFallback className='bg-background text-muted-foreground rounded-md border'>
									<AccountIcon size={64} />
								</AvatarFallback>
							</Avatar>
							<div className='flex flex-col gap-2'>
								<FormControl>
									<FormInput
										{...fieldProps}
										type='file'
										accept='image/jpeg,image/png,image/webp,image/gif'
										onChange={handleChange}
									/>
								</FormControl>
								<FormMessage />
								<FormDescription className='text-xs'>JPEG/PNG/WEBP/GIF &lt;10MB</FormDescription>
								{file && (
									<Button disabled={isSubmitting} variant='secondary' size='sm'>
										Save changes
									</Button>
								)}
							</div>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
