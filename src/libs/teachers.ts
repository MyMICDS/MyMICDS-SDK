/**
 * Teachers API
 */

import { HTTP } from '@mymicds/http';
import { Observable } from 'rxjs/Observable'; // tslint:disable-line

export class TeachersAPI {

	constructor(private http: HTTP) { }

	get() {
		return this.http.get<GetTeachersResponse>('/teachers');
	}

}

/**
 * API Parameters and Responses
 */

export interface GetTeachersResponse {
	teachers: Teacher[];
}

/**
 * Helpers
 */

export type Teacher = Record<'_id' | 'prefix' | 'firstName' | 'lastName', string>;
