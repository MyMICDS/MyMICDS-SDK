/**
 * Dates API
 */

import { HTTP } from '@sdk/http';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable'; // tslint:disable-line

export class DatesAPI {

	constructor(private http: HTTP) { }

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
