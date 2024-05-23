import { H4, Muted } from '@/components/typography';

export default function EmptyState() {
	return (
		<section className='bg-muted flex h-full w-full flex-col items-center justify-center gap-8 rounded-lg px-4 py-12 text-center'>
			<div className='w-1/2 lg:w-1/3'>
				<Illustration />
			</div>

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

function Illustration() {
	return (
		<svg viewBox='0 0 250 160' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M48.46 14.921C23.145 24.724 4.36 49.568.624 79.628c-3.12 25.331 4.336 53.318 48.23 61.291 85.406 15.52 173.447 17.335 193.864-24.525 20.418-41.86-7.524-108.891-50.873-113.53C157.449-.826 97.913-4.221 48.46 14.92Z'
				className='fill-background opacity-50 dark:opacity-10'
			/>
			<path
				d='M156.789 9.067H92.81a7.266 7.266 0 0 0-7.266 7.266v120.911a7.266 7.266 0 0 0 7.266 7.266h63.979a7.266 7.266 0 0 0 7.266-7.266V16.334a7.266 7.266 0 0 0-7.266-7.267Z'
				className='fill-foreground dark:fill-background'
			/>

			<path d='M156.394 20.82H93.198v105.46h63.196V20.821Z' className='fill-card' />

			<path
				d='M147.966 32.453h-46.333v39.552h46.333V32.453Zm-13.827 47.175h-32.506v3.622h32.506v-3.622Z'
				className='fill-muted'
			/>
			<path d='M116.819 90.737h-15.186v3.622h15.186v-3.622Z' className='fill-muted' />
			<path d='M136.72 101.853h-35.087v3.622h35.087v-3.622Z' className='fill-muted' />
			<path d='M78.422 20.82H15.226v105.46h63.196V20.821Z' className='fill-card' />
			<path
				d='M39.591 120.008a2.065 2.065 0 1 0 0-4.13 2.065 2.065 0 0 0 0 4.13Z'
				className='fill-muted'
			/>
			<path
				d='M46.828 120.008a2.065 2.065 0 1 0 0-4.13 2.065 2.065 0 0 0 0 4.13Zm7.235 0a2.065 2.065 0 1 0 0-4.13 2.065 2.065 0 0 0 0 4.13Zm15.93-87.555H23.661v39.552h46.332V32.453ZM56.167 79.628H23.66v3.622h32.506v-3.622Zm13.827 0H58.36v3.622h11.633v-3.622ZM38.847 90.737H23.661v3.622h15.186v-3.622Zm31.146 0H42.075v3.622h27.92v-3.622Zm-11.245 11.116H23.661v3.622h35.087v-3.622Z'
				className='fill-muted'
			/>
			<path d='M234.366 20.82H171.17v105.46h63.196V20.821Z' className='fill-card' />
			<path
				d='M195.536 120.008a2.066 2.066 0 1 0-.001-4.131 2.066 2.066 0 0 0 .001 4.131Zm7.235 0a2.066 2.066 0 1 0 0-4.132 2.066 2.066 0 0 0 0 4.132Z'
				className='fill-muted'
			/>
			<path
				d='M210.008 120.008a2.066 2.066 0 1 0-.001-4.131 2.066 2.066 0 0 0 .001 4.131Z'
				className='fill-muted'
			/>
			<path
				d='M225.938 32.453h-46.333v39.552h46.333V32.453Zm-13.827 47.175h-32.506v3.622h32.506v-3.622Zm13.827 0h-11.633v3.622h11.633v-3.622Zm-31.147 11.109h-15.186v3.622h15.186v-3.622Zm31.155 0h-27.92v3.622h27.92v-3.622Zm-11.253 11.116h-35.088v3.622h35.088v-3.622Z'
				className='fill-muted'
			/>
			<path
				opacity='.1'
				d='M146.364 144.541c0-.76-1.61-31.891-.578-36.523 1.033-4.631 10.509-27.273 8.011-29.916-2.498-2.642-11.648 3.371-11.648 3.371s1.671-27.266-2.277-29.21c-3.949-1.944-5.703 5.672-5.703 5.672l-2.103 30.501-10.418 55.96 24.716.145Z'
				fill='#21201C'
			/>
			<path
				d='M139.325 112.795c1.329-5.315 3.326-10.501 4.601-15.87.843-3.553 6.295-18.405 7.821-22.779.471-1.344.873-2.968-.038-4.062a2.641 2.641 0 0 0-2.422-.76 4.846 4.846 0 0 0-2.339 1.223c-1.518 1.337-4.32 7.95-6.37 7.943-2.483 0-1.314-6.834-1.382-8.148-.281-5.656.137-12.908-2.073-18.223-1.64-3.948-5.71-3.417-6.667.85-.956 4.268-.918 22.15-.918 22.15s-15.885-2.727-18.596 2.118c-2.71 4.844 1.868 35.618 1.868 35.618l26.515-.06Z'
				fill='#F4A28C'
			/>
			<path d='m141.261 160-.288-48.906-29.681-6.515L99.34 160h41.921Z' fill='#FFC53D' />
			<path
				opacity='.1'
				d='m141.261 160-.288-48.906-14.169-3.114-2.536 52.02h16.993Z'
				fill='#21201C'
			/>
		</svg>
	);
}
