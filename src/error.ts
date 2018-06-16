import { ACTIONS } from './api-response';

export class MyMICDSError extends Error {

	constructor(message: string, readonly statusCode: number | null = null, readonly action: ACTIONS | null = null) {
		super(message);
	}

}
