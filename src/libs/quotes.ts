/**
 * Quotes API
 */

import { HTTP } from '@sdk/http';
import { Observable } from 'rxjs/Observable'; // tslint:disable-line

export class QuotesAPI {

	constructor(private http: HTTP) { }

	get() {
		return this.http.get<GetQuoteResponse>('/quote');
	}

	add(param: AddQuoteParameters) {
		return this.http.post('/quote', param);
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
