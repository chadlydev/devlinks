'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { PlusIcon } from '@/components/icons';
import EmptyState from '@/app/(app)/app/links/empty-state';
import { ScrollArea } from '@/components/ui/scroll-area';
import LinkItem from '@/app/(app)/app/links/link-item';
import { useProfileContext } from '@/contexts/profile-context';
import { useEffect } from 'react';
import { Link } from '@/lib/types';
import { linksFormSchema } from '@/lib/zod';
import { toast } from 'sonner';
import { updateLinksAction } from '@/app/(app)/app/links/actions';

type TLinksForm = z.infer<typeof linksFormSchema>;

export default function LinksForm() {
	const { links, handleChangeLinks } = useProfileContext();
	const form = useForm<TLinksForm>({
		resolver: zodResolver(linksFormSchema),
		defaultValues: {
			links
		}
	});

	const {
		control,
		watch,
		formState: { isSubmitting, isDirty }
	} = form;

	const onSubmit = async (formData: TLinksForm) => {
		const result = await updateLinksAction(formData);
		if (result.error) {
			toast.error(result.error);
		} else if (result.success) {
			toast.success(result.success);
		}
	};

	const fieldArray = useFieldArray({
		name: 'links',
		control
	});

	const { append, fields } = fieldArray;

	useEffect(() => {
		const subscription = watch(({ links }) => {
			handleChangeLinks(links as Link[]);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	return (
		<div className='flex h-full flex-grow flex-col gap-8'>
			<Button variant='secondary' onClick={() => append({ platform: '', url: '' })}>
				<PlusIcon size={16} />
				Add new link
			</Button>
			{!fields.length ? (
				<EmptyState />
			) : (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-grow flex-col gap-4'>
						<ScrollArea className='-mr-4 h-[calc(100svh-376px)] pr-4 md:h-[calc(100svh-396px)]'>
							<ol className='flex h-max flex-col gap-4'>
								{fields.map((field, index) => {
									return (
										<LinkItem
											key={field.id}
											id={field.id}
											index={index}
											form={form}
											fieldArray={fieldArray}
										/>
									);
								})}
							</ol>
						</ScrollArea>

						<Button disabled={isSubmitting || !isDirty} className='mt-auto'>
							Save
						</Button>
					</form>
				</Form>
			)}
		</div>
	);
}
