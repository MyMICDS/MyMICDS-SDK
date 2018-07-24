import { Action } from './api-response';

export class MyMICDSError extends Error {

	constructor(message: string, readonly statusCode: number | null = null, readonly action: Action | null = null) {
		super(message);
	}

}
