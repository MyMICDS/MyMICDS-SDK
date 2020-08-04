/**
 * Canvas API
 */

import { Block, ClassType, MyMICDSClass, ScheduleClass } from './classes';
import {
	GetPortalClassesResponse,
	SetPortalURLParameters,
	SetPortalURLResponse,
	TestPortalURLParameters,
	TestPortalURLResponse
} from './portal';
import { HTTP } from '../http';
import { PlannerEvent } from './planner';

import { map } from 'rxjs/operators';
import * as moment from 'moment';

export class CanvasAPI {
	constructor(private http: HTTP) {}

	getClasses(shouldError = false) {
		return this.http.get<GetCanvasClassesResponse>('/canvas/classes', shouldError);
	}

	getEvents(shouldError = false) {
		return this.http.get<GetCanvasEventsResponse>('/canvas/events', shouldError).pipe(
			map(r => {
				if (r && r.events instanceof Array) {
					for (const event of r.events) {
						event.start = moment(event.start);
						event.end = moment(event.end);
						event.createdAt = moment(event.createdAt);
					}
				}
				return r;
			})
		);
	}

	setURL(param: SetCanvasURLParameters, shouldError = false) {
		return this.http.put<SetCanvasURLResponse>('/canvas/url', shouldError, param);
	}

	testURL(param: TestCanvasURLParameters, shouldError = false) {
		return this.http.post<TestCanvasURLResponse>('/canvas/test', shouldError, param);
	}

	getUniqueEvents(shouldError = false) {
		return this.http.get<GetUniqueEventsResponse>('/canvas/unique-events', shouldError).pipe(
			map(r => {
				if (r && r.events) {
					for (const className of Object.keys(r.events)) {
						for (const uniqueEvent of r.events[className]) {
							uniqueEvent.start = moment(uniqueEvent.start);
							uniqueEvent.end = moment(uniqueEvent.end);
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

export interface GetCanvasClassesResponse extends GetPortalClassesResponse {}

export interface GetCanvasEventsResponse {
	hasURL: boolean;
	events: CanvasEvent[];
}

export interface SetCanvasURLParameters extends SetPortalURLParameters {}

export interface SetCanvasURLResponse extends SetPortalURLResponse {}

export interface TestCanvasURLParameters extends TestPortalURLParameters {}

export interface TestCanvasURLResponse extends TestPortalURLResponse {}

export interface GetUniqueEventsResponse {
	events: { [className: string]: UniqueEvent[] };
}

/**
 * Helpers
 */

export interface CanvasEvent extends PlannerEvent {
	canvas: true;
	class: MyMICDSClass | DefaultCanvasClass;
	createdAt: moment.Moment;
}

export interface DefaultCanvasClass extends ScheduleClass {
	_id: null;
	canvas: true;
	user: string;
	name: string;
	teacher: {
		_id: null;
		prefix: '';
		firstName: string;
		lastName: string;
	};
	type: ClassType.OTHER;
	block: Block.OTHER;
	color: '#34444F';
	textDark: false;
}

export interface UniqueEvent {
	_id: string;
	name: string;
	className: string;
	raw: string;
	start: moment.Moment;
	end: moment.Moment;
}
