/**
 * Quotes API
 */

import { HTTP } from '../http';

export class QuotesAPI {

	constructor(private http: HTTP) { }

	get(shouldError = false) {
		return this.http.get<GetQuoteResponse>('/quote', shouldError);
	}

	add(param: AddQuoteParameters, shouldError = false) {
		return this.http.post('/quote', shouldError, param);
	}

}

/**
 * API Parameters and Responses
 */

export interface GetQuoteResponse {
	quote: Quote;
}

export interface AddQuoteParameters {
	quote: string;
	author: string;
}

/**
 * Helpers
 */

export interface Quote {
	_id: string;
	quote: string;
	author: string;
}
