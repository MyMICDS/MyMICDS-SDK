/**
 * Teachers API
 */

import { HTTP } from '@sdk/http';
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

export interface Teacher {
	_id?: string;
	prefix: string;
	firstName: string;
	lastName: string;
}
