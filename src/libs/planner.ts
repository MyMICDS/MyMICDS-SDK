/**
 * Planner API
 */

import { HTTP } from '../http';
import { ScheduleClass } from './classes';

import * as moment from 'moment';
import { map } from 'rxjs/operators';

export class PlannerAPI {

	constructor(private http: HTTP) { }

	getEvents(shouldError = false) {
		return this.http.get<GetPlannerEventsResponse>('/planner', shouldError).pipe(
			map(r => {
				if (r && r.events instanceof Array) {
					for (const event of r.events) {
						event.start = moment(event.start);
						event.end = moment(event.end);
					}
				}
				return r;
			})
		);
	}

	addEvent(param: AddPlannerEventParameters, shouldError = false) {
		return this.http.post<AddPlannerEventResponse>('/planner', shouldError, param);
	}

	deleteEvent(param: DeletePlannerEventParameters, shouldError = false) {
		return this.http.delete('/planner', shouldError, param);
	}

	checkEvent(param: CheckPlannerEventParameters, shouldError = false) {
		return this.http.patch('/planner/check', shouldError, param);
	}

	uncheckEvent(param: UncheckPlannerEventParameters, shouldError = false) {
		return this.http.patch('/planner/uncheck', shouldError, param);
	}

}

/**
 * API Parameters and Responses
 */

export interface GetPlannerEventsResponse {
	events: PlannerEvent[];
}

export interface AddPlannerEventParameters {
	id?: string;
	title: string;
	desc?: string;
	classId?: string | null;
	start?: moment.Moment;
	end?: moment.Moment;
}

export interface AddPlannerEventResponse extends GetPlannerEventsResponse { }

export interface DeletePlannerEventParameters {
	id: string;
}

export interface CheckPlannerEventParameters extends DeletePlannerEventParameters { }

export interface UncheckPlannerEventParameters extends CheckPlannerEventParameters { }

/**
 * Helpers
 */

export interface PlannerEvent {
	_id: string;
	user: string;
	class: ScheduleClass | null;
	title: string;
	start: moment.Moment;
	end: moment.Moment;
	link: string;
	checked: boolean;
	desc: string;
	descPlaintext: string;
}
