/**
 * Classes API
 */

import { HTTP } from '../http';

export class DailyBulletinAPI {
	constructor(private http: HTTP) {}

	getList(shouldError = false) {
		return this.http.get<GetBulletinsResponse>('/daily-bulletin', shouldError);
	}

	query(shouldError = false) {
		return this.http.post('/daily-bulletin/query', shouldError);
	}

	queryAll(shouldError = false) {
		return this.http.post('/daily-bulletin/query-all', shouldError);
	}
}

/**
 * API Parameters and Responses
 */

export interface GetBulletinsResponse {
	baseURL: string;
	bulletins: string[];
}
