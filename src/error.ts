export class MyMICDSError extends Error {

	constructor(message: string, readonly statusCode: number, readonly action: ACTIONS | null) {
		super(message);
	}

}
