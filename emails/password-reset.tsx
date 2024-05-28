import { RESET_PASSWORD_TOKEN_EXPIRES_IN } from '@/lib/constants';

type PasswordResetProps = {
	email: string;
	url: string;
};

export default function PasswordReset({ email, url }: PasswordResetProps) {
	return (
		<div>
			<p>Hello {email},</p>
			<a href={url}>Click to reset your password</a>
			<p>This link expires in {RESET_PASSWORD_TOKEN_EXPIRES_IN} minutes.</p>
			<p>Thank you, team devlinks</p>
		</div>
	);
}
