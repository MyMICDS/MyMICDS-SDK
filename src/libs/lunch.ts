/**
 * Lunch API
 */

import { HTTP } from '../http';
import { School } from './user';

import { Observable } from 'rxjs'; // tslint:disable-line

export class LunchAPI {

	constructor(private http: HTTP) { }

	get(param?: GetLunchParameters) {
		return this.http.get<GetLunchResponse>('/lunch', param);
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
