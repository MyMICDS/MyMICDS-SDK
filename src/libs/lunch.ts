/**
 * Lunch API
 */

import { HTTP } from '../http';
import { School } from './user';

export class LunchAPI {

	constructor(private http: HTTP) { }

	get(param?: GetLunchParameters, shouldError = false) {
		return this.http.get<GetLunchResponse>('/lunch', shouldError, param);
	}

}

/**
 * API Parameters and Responses
 */

export interface GetLunchParameters {
	year?: number;
	month?: number;
	day?: number;
}

export interface GetLunchResponse {
	lunch: {
		[date: string]: Record<School, SchoolLunch>;
	};
}

/**
 * Helpers
 */

export interface SchoolLunch {
	title: string;
	categories: {
		[category: string]: string[]
	};
}
