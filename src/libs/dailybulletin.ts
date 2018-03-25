/**
 * Classes API
 */

import { HTTP } from '../http';
import { Observable } from 'rxjs/Observable'; // tslint:disable-line

export class DailyBulletinAPI {
	constructor(private http: HTTP) { }

	getList() {
		return this.http.get<GetListResponse>('/daily-bulletin');
	}

}

/**
 * API Parameters and Responses
 */

export interface GetListResponse {
	baseURL: string;
	bulletins: string[];
}
