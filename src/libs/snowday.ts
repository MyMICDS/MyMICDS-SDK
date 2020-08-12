/**
 * Snowday API
 */

import { HTTP } from '../http';

export class SnowdayAPI {
	constructor(private http: HTTP) {}

	get(shouldError = false) {
		return this.http.get<GetSnowdayResponse>('/snowday', shouldError);
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
