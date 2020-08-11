/**
 * Teachers API
 */

import { HTTP } from '../http';

export class TeachersAPI {
	constructor(private http: HTTP) {}

	get(shouldError = false) {
		return this.http.get<GetTeachersResponse>('/teachers', shouldError);
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
	_id?: string | null;
	prefix: string;
	firstName: string;
	lastName: string;
}
