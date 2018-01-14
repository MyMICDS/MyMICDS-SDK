/**
 * Canvas API
 */

import * as moment from 'moment';

import { Block, ClassType } from '@libs/classes';
import {
	GetPortalClassesResponse,
	SetPortalURLParameters,
	SetPortalURLResponse,
	TestPortalURLParameters,
	TestPortalURLResponse
} from '@libs/portal';
import { HTTP } from '@mymicds/http';
import { Observable } from 'rxjs/Observable';
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
	events: Array<{
		_id: string;
		canvas: boolean;
		user: string;
		class: {
			_id: string;
			user: string;
			name: string;
			teacher: Record<'_id' | 'prefix' | 'firstName' | 'lastName', string>;
			type: ClassType;
			block: Block;
			color: string;
			textDark: boolean;
		};
		title: string;
		start: moment.Moment;
		end: moment.Moment;
		link: string;
		checked: boolean;
		desc: string;
		descPlaintext: string;
	}>;
}

export interface SetCanvasURLParameters extends SetPortalURLParameters { }

export interface SetCanvasURLResponse extends SetPortalURLResponse { }

export interface TestCanvasURLParameters extends TestPortalURLParameters { }

export interface TestCanvasURLResponse extends TestPortalURLResponse { }
