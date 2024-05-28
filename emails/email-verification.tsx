import { EMAIL_VERIFICATION_EXPIRES_IN } from '@/lib/constants';

type EmailVerificationCodeProps = {
	email: string;
	code: string;
};

export default function EmailVerification({ email, code }: EmailVerificationCodeProps) {
	return (
		<div>
			<p>Hello {email}, Thanks for signing up for devlinks.</p>
			<p>Here&apos;s your 8-digit verification code: {code}</p>
			<p>
				This code expires in {EMAIL_VERIFICATION_EXPIRES_IN} minutes. Please enter it in the
				application to complete your registration.
			</p>
			<p>Thank you, team devlinks</p>
		</div>
	);
}
