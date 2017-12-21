import { ACTIONS } from '@mymicds/api-response';

export class MyMICDSError extends Error {

	constructor(message: string, readonly statusCode: number | null, readonly action: ACTIONS | null) {
		super(message);
	}

}
