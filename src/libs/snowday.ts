/**
 * Snowday API
 */

import { Observable } from 'rxjs'; // tslint:disable-line
import { HTTP } from '../http';

export class SnowdayAPI {

	constructor(private http: HTTP) { }

	get() {
		return this.http.get<GetSnowdayResponse>('/snowday');
	}

}

/**
 * API Parameters and Responses
 */

export interface GetSnowdayResponse {
	data: {
		[date: string]: Snowday;
	};
}

/**
 * Helpers
 */

export interface Snowday {
	start: number;
	finish: number;
	strength: number;
	chance: number;
	temperature: number;
	extraFactor: number;
	inches: number;
	message: string;
}
