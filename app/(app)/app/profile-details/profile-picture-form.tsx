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
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AccountIcon } from '@/components/icons';
import { useProfileContext } from '@/contexts/profile-context';
import { profilePictureFormSchema } from '@/lib/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getS3SignedUrlAction } from '@/app/(app)/app/profile-details/actions';

export type TProfilePictureForm = z.infer<typeof profilePictureFormSchema>;

export default function ProfilePictureForm() {
	const { user, handleChangeUserProfilePicture } = useProfileContext();
	const [file, setFile] = useState<File | null | undefined>(null);
	const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
	const router = useRouter();

	const computeSHA256 = async (file: File) => {
		const buffer = await file.arrayBuffer();
		const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
		return hashHex;
	};

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
		if (file) {
			const checksum = await computeSHA256(file);
			const signedS3UrlResult = await getS3SignedUrlAction(file.type, file.size, checksum);

			if (signedS3UrlResult.error !== undefined) {
				setError('image', { message: signedS3UrlResult.error });
			}

			if (signedS3UrlResult.success) {
				const url = signedS3UrlResult.success.url;

				await fetch(url, {
					method: 'PUT',
					body: file,
					headers: {
						'Content-Type': file.type
					}
				});

				// TODO Delete all old pictures

				toast.success('Successfully updated profile picture');
				reset();
				setFile(null);
				router.refresh();
			}
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='bg-muted rounded-lg p-4 pb-6 pt-4'>
				<FormField
					control={form.control}
					name='image'
					render={({ field: { value, onChange, ...fieldProps } }) => (
						<FormItem className='flex flex-col gap-4 md:flex-row md:items-center md:gap-2'>
							<FormLabel className='md:min-w-60 lg:min-w-80'>Profile picture</FormLabel>
							<div className='flex flex-col gap-6 md:flex-row md:items-center md:gap-8'>
								<Avatar className='size-32 rounded-md'>
									<AvatarImage src={filePreviewUrl || undefined} />
									<AvatarFallback className='bg-background text-muted-foreground rounded-md border'>
										<AccountIcon size={64} />
									</AvatarFallback>
								</Avatar>
								<div className='flex flex-grow flex-col gap-2'>
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
							</div>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
