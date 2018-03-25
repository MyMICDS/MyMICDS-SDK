/**
 * Planner API
 */

import { MyMICDSClass } from '@libs/classes';
import { HTTP } from '../http';

import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable'; // tslint:disable-line

export class PlannerAPI {

	constructor(private http: HTTP) { }

	getEvents() {
		return this.http.get<GetPlannerEventsResponse>('/canvas/events').pipe(
			map(r => {
				for (const event of r.events) {
					event.start = moment(event.start);
					event.end = moment(event.end);
				}

				return r;
			})
		);
	}

	addEvent(param: AddPlannerEventParameters) {
		return this.http.post<AddPlannerEventResponse>('/planner', param);
	}

	deleteEvent(param: DeletePlannerEventParameters) {
		return this.http.delete('/planner', param);
	}

	checkEvent(param: CheckPlannerEventParameters) {
		return this.http.patch('/planner/check', param);
	}

	uncheckEvent(param: UncheckPlannerEventParameters) {
		return this.http.patch('/planner/uncheck', param);
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
	canvas: true;
	user: string;
	class: MyMICDSClass | null;
	title: string;
	start: moment.Moment;
	end: moment.Moment;
	link: string;
	checked: boolean;
	desc: string;
	descPlaintext: string;
}
