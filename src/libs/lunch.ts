/**
 * Lunch API
 */

import { HTTP } from '@mymicds/http';
import { Observable } from 'rxjs/Observable';

export class LunchAPI {

	constructor(private http: HTTP) { }

	get() {
		return this.http.get<GetLunchResponse>('/lunch');
	}

}

/**
 * API Parameters and Responses
 */

export interface GetLunchResponse {
	lunch: {
		[date: string]: Record<'lowerschool' | 'middleschool' | 'upperschool', {
			title: string;
			categories: {
				[category: string]: string[]
			};
		}>;
	};
}
