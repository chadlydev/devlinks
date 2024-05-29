import { InferSelectModel } from 'drizzle-orm';
import { userTable } from '@/db/schema';

export type TUser = InferSelectModel<typeof userTable>;
export type TProfileDetails = Omit<TUser, 'hashedPassword' | 'id' | 'email' | 'emailVerified'>;

export type TPlatformValue =
	| 'github'
	| 'x'
	| 'linkedin'
	| 'youtube'
	| 'facebook'
	| 'twitch'
	| 'devto'
	| 'codewars'
	| 'freecodecamp'
	| 'gitlab'
	| 'hashnode'
	| 'stackoverflow';

export type TPlatformLabel =
	| 'GitHub'
	| 'X'
	| 'LinkedIn'
	| 'YouTube'
	| 'Facebook'
	| 'Twitch'
	| 'Dev.to'
	| 'Codewars'
	| 'freeCodeCamp'
	| 'GitLab'
	| 'Hashnode'
	| 'Stack Overflow';

export type TLink = {
	platform: TPlatformValue;
	url: string;
};

export type TPlatformSelectItem = {
	value: TPlatformValue;
	label: TPlatformLabel;
};

export type TPlatformIcons = {
	[K in TPlatformValue]?: any;
};

export type TPlatformLabels = {
	[K in TPlatformValue]?: TPlatformLabel;
};
