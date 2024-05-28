// --- Email verification ---

export const EMAIL_VERIFICATION_TIMER = 60; // seconds
export const EMAIL_VERIFICATION_TIMER_MS = EMAIL_VERIFICATION_TIMER * 1000; // ms
export const EMAIL_VERIFICATION_EXPIRES_IN = 15; // minutes

// --- Password Reset ---
export const RESET_PASSWORD_TIMER = 300; // seconds
export const RESET_PASSWORD_TIMER_MS = RESET_PASSWORD_TIMER * 1000; // ms
export const RESET_PASSWORD_TOKEN_EXPIRES_IN = 30; // minutes

// --- Session ---
export const SESSION_EXPIRES_IN = 60 * 60 * 24 * 30; // 30 days

// --- Routes ---
export const ROUTE_ROOT = '/';
export const ROUTE_LINKS = '/app/links';
export const ROUTE_PROFILE_DETAILS = '/app/profile-details';
export const ROUTE_ACCOUNT_SETTINGS = '/app/account-settings';
export const ROUTE_PREVIEW_PAGE = '/chadly';
export const ROUTE_SETTINGS = '/app/settings';
export const ROUTE_LOGIN = '/login';
export const ROUTE_SIGN_UP = '/sign-up';
export const ROUTE_GET_STARTED = '/get-started';
export const ROUTE_VERIFY_EMAIL = '/verify-email';
export const ROUTE_RESET_PASSWORD = '/reset-password';

// --- OAuth ---
export const GOOGLE_OAUTH_STATE_COOKIES = 'google_oauth_state';
export const GOOGLE_OAUTH_CODE_VERIFIER_COOKIES = 'google_oauth_code_verifier';
export const GOOGLE_OAUTH_API_URL = 'https://www.googleapis.com/oauth2/v1/userinfo';

export const GITHUB_OAUTH_STATE_COOKIES = 'github_oauth_state';
export const GITHUB_OAUTH_API_URL = 'https://api.github.com/user';
