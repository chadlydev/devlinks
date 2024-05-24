import { cn } from '@/lib/utils';
import { Large } from '@/components/typography';
import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon, TrashIcon } from '@/components/icons';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import { PlatformLabel, PlatformValue } from '@/lib/types';

type PlatformItem = {
	value: PlatformValue;
	label: PlatformLabel;
};

export const platformItemList: PlatformItem[] = [
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
	index: number;
	form: UseFormReturn<{ links: { platform: string; link: string }[] }, any, undefined>;
	fieldArray: UseFieldArrayReturn<{ links: { platform: string; link: string }[] }, 'links', 'id'>;
};

export default function LinkItem({ id, index, form, fieldArray }: LinkItemProps) {
	const [open, setOpen] = useState(false);

	const handleMoveUp = (index: number) => {
		fieldArray.swap(index, index - 1);
	};

	const handleMoveDown = (index: number) => {
		fieldArray.swap(index, index + 1);
	};

	return (
		<li key={id} className={cn('bg-muted flex gap-4 rounded-lg p-4 pb-6 pt-4')}>
			<div className='flex flex-grow flex-col gap-4'>
				<div className='flex items-center justify-between'>
					<Large>Link #{index + 1}</Large>
				</div>
				<FormField
					control={form.control}
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
					disabled={index + 1 >= fieldArray.fields.length}
					onClick={() => handleMoveDown(index)}
				>
					<ChevronDownIcon size={16} />
				</Button>
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
