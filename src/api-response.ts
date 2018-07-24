export interface APIResponse<T> {
	error: string | null;
	action: Action | null;
	data: T | null;
}

export enum Action {
	LOGIN_EXPIRED = 'LOGIN_EXPIRED',
	UNAUTHORIZED = 'UNAUTHORIZED',
	NOT_LOGGED_IN = 'NOT_LOGGED_IN'
}
