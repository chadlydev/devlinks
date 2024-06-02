import { cn } from '@/lib/utils';
import { Large } from '@/components/typography';
import {
	FormControl,
	FormField,
	FormInput,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CheckIcon, ChevronsUpDownIcon, GripVerticalIcon, TrashIcon } from '@/components/icons';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import { TPlatformSelectItem } from '@/lib/types';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { UniqueIdentifier } from '@dnd-kit/core';

export const platformItemList: TPlatformSelectItem[] = [
	{ value: 'github', label: 'GitHub' },
	{ value: 'x', label: 'X' },
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

type LinkItemProps = {
	id: string;
	activeId: UniqueIdentifier | null;
	index: number;
	form: UseFormReturn<{ links: { platform: string; url: string }[] }, any, undefined>;
	fieldArray: UseFieldArrayReturn<{ links: { platform: string; url: string }[] }, 'links', 'id'>;
};

export default function LinkItem({ id, index, form, activeId, fieldArray }: LinkItemProps) {
	const [open, setOpen] = useState(false);

	const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } =
		useSortable({
			id
		});

	const style = transform
		? {
				transform: CSS.Translate.toString(transform),
				transition
			}
		: undefined;

	return (
		<li
			ref={setNodeRef}
			style={style}
			key={id}
			className={cn('flex gap-4 rounded-lg bg-muted p-4 pb-6 pt-4', {
				'rounded-2xl border-8 border-card opacity-50': activeId === id
			})}
		>
			<div className='flex flex-grow flex-col gap-4'>
				<div className='flex items-center justify-between'>
					<Large>Link #{index + 1}</Large>
				</div>
				<FormField
					control={form.control}
					name={`links.${index}.url` as const}
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
				<FormField
					control={form.control}
					name={`links.${index}.platform` as const}
					render={({ field, fieldState: { error } }) => (
						<FormItem>
							<FormLabel>Platform</FormLabel>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant='outline'
											role='combobox'
											className={cn('justify-between font-normal', {
												'text-muted-foreground': !field.value,
												'border-destructive': error?.message
											})}
										>
											{field.value
												? platformItemList.find((item) => item.value === field.value)?.label
												: 'Select platform'}
											<ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>
									<Command>
										<CommandInput placeholder='Search platform...' />
										<CommandEmpty>No platform found.</CommandEmpty>
										<CommandGroup>
											<CommandList>
												{platformItemList.map((item) => (
													<CommandItem
														value={item.label}
														key={item.value}
														onSelect={() => {
															form.setValue(`links.${index}.platform`, item.value);
															setOpen(false);
														}}
													>
														<CheckIcon
															className={cn(
																'mr-2 h-4 w-4',
																item.value === field.value ? 'opacity-100' : 'opacity-0'
															)}
														/>
														{item.label}
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
			</div>
			<div className='flex flex-col gap-4'>
				<div
					{...attributes}
					{...listeners}
					ref={setActivatorNodeRef}
					className='flex size-10 items-center justify-center'
				>
					<GripVerticalIcon size={20} />
				</div>
				<Button
					type='button'
					size='icon'
					variant='outline'
					className='mt-auto'
					onClick={() => fieldArray.remove(index)}
				>
					<TrashIcon size={14} />
				</Button>
			</div>
		</li>
	);
}
