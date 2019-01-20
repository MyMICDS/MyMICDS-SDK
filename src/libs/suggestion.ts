/**
 * Suggestion API
 */

import { HTTP } from '../http';

export class SuggestionAPI {

	constructor(private http: HTTP) { }

	submit(param: SubmitSuggestionParameters) {
		return this.http.post('/suggestion', param);
	}

}

/**
 * API Parameters and Responses
 */

export interface SubmitSuggestionParameters {
	submission: string;
}
