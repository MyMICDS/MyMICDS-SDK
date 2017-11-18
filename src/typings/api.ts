export interface APIResponse<ResponseData> {
	error: string;
	action: ACTIONS;
	data: ResponseData;
}

export type ACTIONS = 'LOGIN_EXPIRED' | 'UNAUTHORIZED' | 'NOT_LOGGED_IN';
