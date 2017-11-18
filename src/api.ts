export interface APIResponse<ResponseData> {
	error: string | null;
	action: ACTIONS | null;
	data: ResponseData | null;
}

export type ACTIONS = 'LOGIN_EXPIRED' | 'UNAUTHORIZED' | 'NOT_LOGGED_IN';

export class MyMICDSError extends Error {

	constructor(message: string, readonly statusCode: number, readonly action: ACTIONS) {
		super(message);
	}

}
