import Image from 'next/image';
import emptyState from '@/public/illustration-empty-state.svg';
import { H4, Muted } from '@/components/typography';

export default function EmptyState() {
	return (
		<section className='bg-muted flex h-full w-full flex-col items-center justify-center gap-8 rounded-lg px-4 py-12 text-center'>
			<Image src={emptyState} alt='Empty state' className='w-1/2 md:w-1/3' />

			<div className='flex flex-col gap-2 md:w-2/3'>
				<H4>Let&apos;s get you started</H4>
				<Muted>
					Use the &quot;Add new link&quot; button to get started. Once you have more than one link,
					you can reorder and edit them. We’re here to help you share your profiles with everyone!
				</Muted>
			</div>
		</section>
	);
}
