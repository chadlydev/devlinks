import { db } from '@/db';
import { userTable } from '@/db/schema';
import { eq, or } from 'drizzle-orm';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
	const body = await request.text();
	const signature = request.headers.get('stripe-signature');

	// verify webhook came from Stripe
	let event;
	try {
		event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
	} catch (error) {
		console.log('Webhook verification failed', error);
		return Response.json(null, { status: 400 });
	}

	// fulfill order
	await db
		.update(userTable)
		.set({ subscription: 'pro' })
		.where(
			or(
				eq(userTable.email, event.data.object.customer_email),
				eq(userTable.id, event.data.object.client_reference_id)
			)
		);

	// return 200 OK
	return Response.json(null, { status: 200 });
}
