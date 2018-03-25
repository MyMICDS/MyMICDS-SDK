/**
 * Sports API
 */

import { HTTP } from '../http';

import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators'; // tslint:disable-line

export class SportsAPI {

	constructor(private http: HTTP) { }

	getScores() {
		return this.http.get<GetScoresResponse>('/sports').pipe(
			tap(r => {
				for (const score of r.scores.scores) {
					score.eid = parseInt(score.eid as any, 10);
					score.nid = parseInt(score.nid as any, 10);
					score.us_score = parseInt(score.us_score as any, 10);
					score.opp_score = parseInt(score.opp_score as any, 10);
					score.update_date = moment(score.update_date);
				}

				for (const event of r.scores.events) {
					event.eid = parseInt(event.eid as any, 10);
					event.starttime = moment(event.starttime);
				}
			})
		);
	}

}

/**
 * API Parameters and Responses
 */

export interface GetScoresResponse {
	scores: {
		scores: SportsScore[];
		events: SportsEvent[];
	};
}

/**
 * Helpers
 */

export interface SportsEventBase {
	eid: number;
	name: string;
	description: string;
	starttime: string | moment.Moment;
	us_img: string;
	opp_img: string;
}

export interface SportsScore extends SportsEventBase {
	nid: number;
	us_score: number;
	opp_score: number;
	update_date: moment.Moment;
	note: null;
	starttime: string;
}

export interface SportsEvent extends SportsEventBase {
	starttime: moment.Moment;
}
