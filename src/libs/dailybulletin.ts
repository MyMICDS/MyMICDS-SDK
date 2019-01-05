/**
 * Classes API
 */

import { Observable } from 'rxjs'; // tslint:disable-line
import { HTTP } from '../http';

export class DailyBulletinAPI {
	constructor(private http: HTTP) { }

	getList() {
		return this.http.get<GetBulletinsResponse>('/daily-bulletin');
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

export interface GetBulletinsResponse {
	baseURL: string;
	bulletins: string[];
}
