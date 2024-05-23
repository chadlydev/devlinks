'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Form, FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon, PlusIcon, TrashIcon } from '@/components/icons';
import EmptyState from '@/app/(app)/app/links/empty-state';
import { Large } from '@/components/typography';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

const platformOptions = [
	{ value: 'github', label: 'GitHub' },
	{ value: 'twitter', label: 'Twitter' },
	{ value: 'linkedin', label: 'LinkedIn' },
	{ value: 'youtube', label: 'YouTube' },
	{ value: 'facebook', label: 'Facebook' },
	{ value: 'twitch', label: 'Twitch' },
	{ value: 'devto', label: 'Dev.to' },
	{ value: 'codewars', label: 'Codewars' },
	{ value: 'freecodecamp', label: 'freeCodeCamp' },
	{ value: 'gitlab', label: 'GitLab' },
	{ value: 'hashnode', label: 'Hashnode' },
	{ value: 'stackoverflow', label: 'Stack Overflow' }
];

const linkObject = z.object({
	platform: z.string({ required_error: 'This field is required' }).min(1),
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

	const { fields, append, remove, swap } = useFieldArray({
		name: 'links',
		control
	});

	const handleMoveUp = (index: number) => {
		swap(index, index - 1);
	};

	const handleMoveDown = (index: number) => {
		swap(index, index + 1);
	};

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
						<ScrollArea className='-mr-4 h-[calc(100svh-376px)] pr-4 md:h-[calc(100svh-404px)]'>
							<ol className='flex h-max flex-col gap-4'>
								{fields.map((field, index) => {
									return (
										<li
											key={field.id}
											className={cn('bg-muted flex gap-4 rounded-lg p-4 pb-6 pt-4')}
										>
											<div className='flex flex-grow flex-col gap-4'>
												<div className='flex items-center justify-between'>
													<Large>Link #{index + 1}</Large>
												</div>
												<FormField
													control={control}
													name={`links.${index}.platform` as const}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Platform</FormLabel>
															<Popover>
																<PopoverTrigger asChild>
																	<FormControl>
																		<Button
																			variant='outline'
																			role='combobox'
																			className={cn(
																				'justify-between font-normal',
																				!field.value && 'text-muted-foreground'
																			)}
																		>
																			{field.value
																				? platformOptions.find(
																						(platformOption) => platformOption.value === field.value
																					)?.label
																				: 'Select platform'}
																			<ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
																		</Button>
																	</FormControl>
																</PopoverTrigger>
																<PopoverContent>
																	<Command>
																		<CommandInput placeholder='Search platform...' />
																		<CommandEmpty>No platform found.</CommandEmpty>
																		<CommandGroup>
																			<CommandList>
																				{platformOptions.map((platformOption) => (
																					<CommandItem
																						value={platformOption.label}
																						key={platformOption.value}
																						onSelect={() => {
																							form.setValue(
																								`links.${index}.platform`,
																								platformOption.value
																							);
																						}}
																					>
																						<CheckIcon
																							className={cn(
																								'mr-2 h-4 w-4',
																								platformOption.value === field.value
																									? 'opacity-100'
																									: 'opacity-0'
																							)}
																						/>
																						{platformOption.label}
																					</CommandItem>
																				))}
																			</CommandList>
																		</CommandGroup>
																	</Command>
																</PopoverContent>
															</Popover>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={control}
													name={`links.${index}.link` as const}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Link</FormLabel>
															<FormControl>
																<FormInput {...field} placeholder='https://github.com/chadlydev' />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
											<div className='flex flex-col gap-4'>
												<Button
													type='button'
													size='icon'
													variant='outline'
													disabled={index === 0}
													onClick={() => handleMoveUp(index)}
												>
													<ChevronUpIcon size={16} />
												</Button>
												<Button
													type='button'
													size='icon'
													variant='outline'
													disabled={index + 1 >= fields.length}
													onClick={() => handleMoveDown(index)}
												>
													<ChevronDownIcon size={16} />
												</Button>
												<Button
													type='button'
													size='icon'
													variant='outline'
													className='mt-auto'
													onClick={() => remove(index)}
												>
													<TrashIcon size={14} />
												</Button>
											</div>
										</li>
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
