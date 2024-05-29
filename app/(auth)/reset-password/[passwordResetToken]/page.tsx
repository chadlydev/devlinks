import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ResetPasswordForm from '@/app/(auth)/reset-password/[passwordResetToken]/reset-password-form';
import { redirect } from 'next/navigation';
import { ROUTE_RESET_PASSWORD } from '@/lib/constants';
import { encodeHex } from 'oslo/encoding';
import { sha256 } from 'oslo/crypto';
import { db } from '@/db';
import { passwordResetTokenTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { isWithinExpirationDate } from 'oslo';

export default async function PasswordResetPage({
	params
}: {
	params: { passwordResetToken: string };
}) {
	const token = params.passwordResetToken;
	if (!token) return redirect(ROUTE_RESET_PASSWORD);

	const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));
	const databaseToken = await db.query.passwordResetTokenTable.findFirst({
		where: eq(passwordResetTokenTable.tokenHash, tokenHash)
	});

	if (!databaseToken) {
		return redirect(ROUTE_RESET_PASSWORD);
	}

	if (!isWithinExpirationDate(databaseToken.expiresAt)) {
		return redirect(ROUTE_RESET_PASSWORD);
	}

	return (
		<main>
			<Card className='sm:w-[25rem]'>
				<CardHeader>
					<CardTitle>Set new password</CardTitle>
					<CardDescription>Enter your new password below to proceed</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-4'>
					<ResetPasswordForm />
				</CardContent>
			</Card>
		</main>
	);
}
