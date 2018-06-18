/**
 * Dates API
 */
import { HTTP } from '../http';

import * as moment from 'moment';
import { Observable } from 'rxjs'; // tslint:disable-line
import { map } from 'rxjs/operators';

export class DatesAPI {

	constructor(private http: HTTP) { }

	schoolStarts() {
		return this.http.get<SchoolStartsResponse>('/dates/school-ends');
	}

	schoolEnds() {
		return this.http.get<SchoolEndsResponse>('/dates/school-ends');
	}

	getBreaks() {
		return this.http.get<GetBreaksResponse>('/dates/breaks').pipe(
			map(r => {
				for (const group of Object.values(r.breaks)) {
					for (const range of group) {
						range.start = moment(range.start);
						range.end = moment(range.end);
					}
				}

				return r;
			})
		);
	}

}

/**
 * API Parameters and Responses
 */

export interface SchoolStartsResponse {
	date: moment.Moment;
}

export interface SchoolEndsResponse {
	date: moment.Moment;
}

export interface GetBreaksResponse {
	breaks: Record<'weekends' | 'longWeekends' | 'vacations' | 'other', DateRange[]>;
}

/**
 * Helpers
 */

export interface DateRange {
	start: moment.Moment;
	end: moment.Moment;
}
