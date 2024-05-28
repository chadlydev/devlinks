import { InferSelectModel } from 'drizzle-orm';
import { userTable } from '@/db/schema';

export type User = InferSelectModel<typeof userTable>;
export type UserEssentials = Omit<User, 'hashedPassword' | 'name' | 'profilePictureUrl'>;

export type PlatformValue =
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

export type PlatformLabel =
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

// TODO Figure out why I can't use PlatformValue type
export type Link = {
	platform: string;
	url: string;
};
