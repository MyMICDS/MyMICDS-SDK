/**
 * Stats API
 */

import { HTTP } from '../http';
import { Observable } from 'rxjs/Observable'; // tslint:disable-line

export class StatsAPI {

	constructor(private http: HTTP) { }

	get() {
		return this.http.get('/stats');
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
