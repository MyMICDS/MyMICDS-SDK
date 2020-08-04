/**
 * Suggestion API
 */

import { HTTP } from '../http';

export class SuggestionAPI {
	constructor(private http: HTTP) {}

	submit(param: SubmitSuggestionParameters, shouldError = false) {
		return this.http.post('/suggestion', shouldError, param);
	}
}

/**
 * API Parameters and Responses
 */

export interface SubmitSuggestionParameters {
	type: string;
	submission: string;
}
