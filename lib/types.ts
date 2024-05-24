export type User = {
	name: string;
	email: string;
	profilePictureUrl: string;
};

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
