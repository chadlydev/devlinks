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
import { useEffect, useState } from 'react';
import { TLink } from '@/lib/types';
import { linksFormSchema } from '@/lib/zod';
import { toast } from 'sonner';
import { updateLinksAction } from '@/app/(app)/app/links/actions';
import { useRouter } from 'next/navigation';
import {
	closestCenter,
	DndContext,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	UniqueIdentifier,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import {
	horizontalListSortingStrategy,
	SortableContext,
	sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import {
	createSnapModifier,
	restrictToParentElement,
	restrictToVerticalAxis
} from '@dnd-kit/modifiers';
import { Skeleton } from '@/components/ui/skeleton';

type TLinksForm = z.infer<typeof linksFormSchema>;

export default function LinksForm() {
	const router = useRouter();
	const { links, handleChangeLinks, user } = useProfileContext();
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
			router.refresh();
		}
	};

	const fieldArray = useFieldArray({
		name: 'links',
		control
	});

	const { append, fields, swap, move } = fieldArray;

	useEffect(() => {
		const subscription = watch(({ links }) => {
			handleChangeLinks(links as TLink[]);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	const isFreeUser = user.subscription !== 'pro';

	const handleAddLink = () => {
		if (isFreeUser && fields.length >= 5) {
			toast.error('Upgrade to pro to add more links');
		} else {
			append({ platform: '', url: '' });
		}
	};

	// Drag & drop
	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		setActiveId(active.id);
	};

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event;

		if (!over) return;

		if (active.id !== over.id) {
			const oldIndex = fields.findIndex((field) => field.id === active.id);
			const newIndex = fields.findIndex((field) => field.id === over.id);

			swap(oldIndex, newIndex);
		}
	};

	const handleDragEnd = () => {
		setActiveId(null);
	};

	const mouseSensor = useSensor(MouseSensor, {
		// Require the mouse to move by 10 pixels before activating
		activationConstraint: {
			distance: 10
		}
	});
	const touchSensor = useSensor(TouchSensor, {
		// Press delay of 250ms, with tolerance of 5px of movement
		activationConstraint: {
			delay: 250,
			tolerance: 5
		}
	});

	const sensors = useSensors(
		mouseSensor,
		touchSensor,
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	const snapToGridModifier = createSnapModifier(240);

	return (
		<div className='flex h-full flex-grow flex-col gap-8'>
			<Button variant='secondary' onClick={handleAddLink}>
				<PlusIcon size={16} />
				Add new link
			</Button>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-grow flex-col gap-4'>
					<ScrollArea className='-mr-4 h-[calc(100svh-376px)] overflow-x-clip pr-4 md:h-[calc(100svh-396px)]'>
						{!fields.length ? (
							<EmptyState />
						) : (
							<ol className='flex flex-col gap-4'>
								<DndContext
									collisionDetection={closestCenter}
									onDragStart={handleDragStart}
									onDragOver={handleDragOver}
									onDragEnd={handleDragEnd}
									sensors={sensors}
									modifiers={[restrictToVerticalAxis, restrictToParentElement, snapToGridModifier]}
								>
									<SortableContext items={fields} strategy={horizontalListSortingStrategy}>
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
									</SortableContext>
									<DragOverlay>
										{activeId ? (
											<Skeleton className='h-[224px] w-full animate-none opacity-50' />
										) : null}
									</DragOverlay>
								</DndContext>
							</ol>
						)}
					</ScrollArea>
					<Button disabled={isSubmitting || !isDirty} className='mt-auto'>
						Save
					</Button>
				</form>
			</Form>
		</div>
	);
}
