'use server';

import { validateRequest } from '@/lib/server-utils';
import { ROUTE_PAYMENT } from '@/lib/constants';
import { redirect } from 'next/navigation';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSessionAction() {
	const { user } = await validateRequest();
	if (!user) {
		return {
			error: 'Not authorized'
		};
	}

	const checkoutSession = await stripe.checkout.sessions.create({
		customer_email: user.email ? user.email : undefined,
		client_reference_id: user.id,
		line_items: [
			{
				price: 'price_1PM7hTBd2AZ2TcCm9bOrRKNi',
				quantity: 1
			}
		],
		mode: 'payment',
		success_url: `${process.env.NEXT_PUBLIC_APP_URL}${ROUTE_PAYMENT}?success=true`,
		cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}${ROUTE_PAYMENT}?cancelled=true`
	});

	// redirect user
	redirect(checkoutSession.url);
}
