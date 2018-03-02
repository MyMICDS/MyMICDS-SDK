/**
 * Snowday API
 */

import { HTTP } from '@sdk/http';
import { Observable } from 'rxjs/Observable'; // tslint:disable-line

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
