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

const linkObject = z.object({
	platform: z
		.string({ required_error: 'This field is required' })
		.min(1, { message: 'Pick a platform' }),
	link: z.string({ required_error: 'This field is required' }).url({ message: 'Invalid URL' })
});

const linksFormSchema = z.object({
	links: z.array(linkObject)
});

type TLinksForm = z.infer<typeof linksFormSchema>;

export default function LinksForm() {
	const form = useForm<TLinksForm>({
		resolver: zodResolver(linksFormSchema),
		defaultValues: {
			links: []
		}
	});

	const {
		control,
		formState: { isSubmitting, isDirty }
	} = form;

	const onSubmit = async (values: TLinksForm) => {
		console.log(values);
	};

	const fieldArray = useFieldArray({
		name: 'links',
		control
	});

	const { append, fields } = fieldArray;

	return (
		<div className='flex h-full flex-grow flex-col gap-8'>
			<Button variant='secondary' onClick={() => append({ platform: '', link: '' })}>
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
