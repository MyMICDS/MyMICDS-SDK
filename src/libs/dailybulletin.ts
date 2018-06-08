/**
 * Classes API
 */

import { Observable } from 'rxjs/Observable';
import { HTTP } from '../http';

export class DailyBulletinAPI {
	constructor(private http: HTTP) { }

	getList() {
		return this.http.get<GetListResponse>('/daily-bulletin');
	}

	query() {
		return this.http.post('/daily-bulletin/query');
	}

	queryAll() {
		return this.http.post('/daily-bulletin/query-all');
	}

}

/**
 * API Parameters and Responses
 */

export interface GetListResponse {
	baseURL: string;
	bulletins: string[];
}
