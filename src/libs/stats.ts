/**
 * Stats API
 */

import { HTTP } from '../http';

export class StatsAPI {

	constructor(private http: HTTP) { }

	get(shouldError = false) {
		return this.http.get<GetStatsResponse>('/stats', shouldError);
	}

}

/**
 * API Parameters and Responses
 */

export interface GetStatsResponse {
	stats: {
		registered: {
			total: number;
			today: number;
			gradYears: {
				[year: string]: {
					[date: string]: number;
				}
			}
		}
		visitedToday: {
			total: number;
			gradYears: {
				[year: string]: number;
			}
		}
	};
}
