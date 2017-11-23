export interface APIResponse<T> {
	error: string | null;
	action: ACTIONS | null;
	data: T | null;
}

export type ACTIONS = 'LOGIN_EXPIRED' | 'UNAUTHORIZED' | 'NOT_LOGGED_IN';
