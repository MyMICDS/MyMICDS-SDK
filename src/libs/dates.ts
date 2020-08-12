/**
 * Dates API
 */
import { HTTP } from '../http';

import { map } from 'rxjs/operators';
import * as moment from 'moment';

export class DatesAPI {
	constructor(private http: HTTP) {}

	schoolStarts(shouldError = false) {
		return this.http.get<SchoolStartsResponse>('/dates/school-ends', shouldError);
	}

	schoolEnds(shouldError = false) {
		return this.http.get<SchoolEndsResponse>('/dates/school-ends', shouldError);
	}

	getBreaks(shouldError = false) {
		return this.http.get<GetBreaksResponse>('/dates/breaks', shouldError).pipe(
			map(r => {
				if (r && r.breaks instanceof Array) {
					for (const group of Object.values(r.breaks)) {
						if (group instanceof Array) {
							for (const range of group) {
								range.start = moment(range.start);
								range.end = moment(range.end);
							}
						}
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
