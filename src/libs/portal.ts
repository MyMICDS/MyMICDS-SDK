/**
 * Portal API
 */

import { Observable } from 'rxjs'; // tslint:disable-line
import { HTTP } from '../http';

export class PortalAPI {

	constructor(private http: HTTP) { }

	getClasses() {
		return this.http.get<GetPortalClassesResponse>('/portal/classes');
	}

	getDayRotation() {
		return this.http.get<GetPortalDayRotationResponse>('/portal/day-rotation');
	}

	setClassesURL(param: SetPortalURLParameters) {
		return this.http.put<SetPortalURLResponse>('/portal/url/classes', param);
	}

	testClassesURL(param: TestPortalURLParameters) {
		return this.http.post<TestPortalURLResponse>('/portal/url/test-classes', param);
	}

	setCalendarURL(param: SetPortalURLParameters) {
		return this.http.put<SetPortalURLResponse>('/portal/url/calendar', param);
	}

	testCalendarURL(param: TestPortalURLParameters) {
		return this.http.post<TestPortalURLResponse>('/portal/url/test-calendar', param);
	}

}

/**
 * API Parameters and Responses
 */

export interface GetPortalClassesResponse {
	hasURL: boolean;
	classes: string[];
}

export interface GetPortalDayRotationResponse {
	days: {
		[year: string]: {
			[month: string]: {
				[day: string]: number
			};
		};
	};
}

export interface SetPortalURLParameters {
	url: string;
}

export interface SetPortalURLResponse {
	valid: boolean;
	url: string;
}

export interface TestPortalURLParameters extends SetPortalURLParameters { }

export interface TestPortalURLResponse extends SetPortalURLResponse { }
