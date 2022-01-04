/**
 * Classes API
 */

import { HTTP } from '../http';

export class DailyBulletinAPI {
	constructor(private http: HTTP) {}

	getPdfList(shouldError = false) {
		return this.http.get<GetBulletinsResponse>('/daily-bulletin/pdf', shouldError);
	}

	getGDocBulletin(shouldError = false) {
		return this.http.get<GetGDocBulletinResponse>('/daily-bulletin', shouldError);
	}

	query(shouldError = false) {
		return this.http.post('/daily-bulletin/query', shouldError);
	}

	queryAll(shouldError = false) {
		return this.http.post('/daily-bulletin/pdf/query-all', shouldError);
	}
}

/**
 * API Parameters and Responses
 */

export interface GetBulletinsResponse {
	baseURL: string;
	bulletins: string[];
}

export interface GetGDocBulletinResponse {
	baseURL: string;
	bulletin: string;
	bulletinDate: string;
}
