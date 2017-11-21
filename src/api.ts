export interface APIResponse<TResponseData> {
	error: string | null;
	action: ACTIONS | null;
	data: TResponseData | null;
}

export type ACTIONS = 'LOGIN_EXPIRED' | 'UNAUTHORIZED' | 'NOT_LOGGED_IN';

export class MyMICDSError extends Error {

	constructor(message: string, readonly statusCode: number, readonly action: ACTIONS | null) {
		super(message);
	}

}
