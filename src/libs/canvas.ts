/**
 * Canvas API
 */

import { HTTP } from '../http';
import { Block, ClassType, MyMICDSClass, ScheduleClass } from './classes';
import { PlannerEvent } from './planner';
import {
	GetPortalClassesResponse,
	SetPortalURLParameters,
	SetPortalURLResponse,
	TestPortalURLParameters,
	TestPortalURLResponse
} from './portal';

import * as moment from 'moment';
import { Observable } from 'rxjs'; // tslint:disable-line
import { map } from 'rxjs/operators';

export class CanvasAPI {

	constructor(private http: HTTP) { }

	getClasses() {
		return this.http.get<GetCanvasClassesResponse>('/canvas/classes');
	}

	getEvents() {
		return this.http.get<GetCanvasEventsResponse>('/canvas/events').pipe(
			map(r => {
				for (const event of r.events) {
					event.start = moment(event.start);
					event.end = moment(event.end);
				}

				return r;
			})
		);
	}

	setURL(param: SetCanvasURLParameters) {
		return this.http.put<SetCanvasURLResponse>('/portal/url', param);
	}

	testURL(param: TestCanvasURLParameters) {
		return this.http.post<TestCanvasURLResponse>('/portal/test', param);
	}

}

/**
 * API Parameters and Responses
 */

export interface GetCanvasClassesResponse extends GetPortalClassesResponse { }

export interface GetCanvasEventsResponse {
	hasURL: boolean;
	events: CanvasEvent[];
}

export interface SetCanvasURLParameters extends SetPortalURLParameters { }

export interface SetCanvasURLResponse extends SetPortalURLResponse { }

export interface TestCanvasURLParameters extends TestPortalURLParameters { }

export interface TestCanvasURLResponse extends TestPortalURLResponse { }

/**
 * Helpers
 */

export interface CanvasEvent extends PlannerEvent {
	canvas: true;
	class: MyMICDSClass | DefaultCanvasClass;
}

export interface DefaultCanvasClass extends ScheduleClass {
	_id: null;
	canvas: true;
	user: string;
	name: string;
	teacher: {
		_id: null,
		prefix: '',
		firstName: string,
		lastName: string
	};
	type: ClassType.OTHER;
	block: Block.OTHER;
	color: '#34444F';
	textDark: false;
}
