/**
 * Schedule API
 */

import * as moment from 'moment';

import { ScheduleClass } from './classes';
import { HTTP } from '../http';
import { Observable } from 'rxjs/Observable'; // tslint:disable-line
import { map } from 'rxjs/operators';

export class ScheduleAPI {

	constructor(private http: HTTP) { }

	get(param?: GetScheduleParameters) {
		return this.http.get<GetScheduleResponse>('/schedule', param).pipe(
			map(r => {
				for (const scheduleClass of r.schedule.classes) {
					scheduleClass.start = moment(scheduleClass.start);
					scheduleClass.end = moment(scheduleClass.end);
				}

				return r;
			})
		);
	}

}

/**
 * API Parameters and Responses
 */

export interface GetScheduleParameters {
	year?: number;
	month?: number;
	day?: number;
}

export interface GetScheduleResponse {
	hasURL: boolean;
	schedule: {
		day: number;
		special: boolean;
		classes: Array<{
			class: ScheduleClass;
			start: moment.Moment;
			end: moment.Moment;
		}>;
	};
}

/**
 * Helpers
 */

export interface PortalClass extends ScheduleClass {
	portal: true;
}
