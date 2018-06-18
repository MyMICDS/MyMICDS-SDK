/**
 * Stats API
 */

import { Observable } from 'rxjs'; // tslint:disable-line
import { HTTP } from '../http';

export class StatsAPI {

	constructor(private http: HTTP) { }

	get() {
		return this.http.get<GetStatsResponse>('/stats');
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
