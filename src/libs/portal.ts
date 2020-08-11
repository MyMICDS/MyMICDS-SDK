/**
 * Portal API
 */

import { HTTP } from '../http';

export class PortalAPI {
	constructor(private http: HTTP) {}

	getClasses(shouldError = false) {
		return this.http.get<GetPortalClassesResponse>('/portal/classes', shouldError);
	}

	getDayRotation(shouldError = false) {
		return this.http.get<GetPortalDayRotationResponse>('/portal/day-rotation', shouldError);
	}

	setClassesURL(param: SetPortalURLParameters, shouldError = false) {
		return this.http.put<SetPortalURLResponse>('/portal/url/classes', shouldError, param);
	}

	testClassesURL(param: TestPortalURLParameters, shouldError = false) {
		return this.http.post<TestPortalURLResponse>(
			'/portal/url/test-classes',
			shouldError,
			param
		);
	}

	setCalendarURL(param: SetPortalURLParameters, shouldError = false) {
		return this.http.put<SetPortalURLResponse>('/portal/url/calendar', shouldError, param);
	}

	testCalendarURL(param: TestPortalURLParameters, shouldError = false) {
		return this.http.post<TestPortalURLResponse>(
			'/portal/url/test-calendar',
			shouldError,
			param
		);
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
				[day: string]: number;
			};
		};
	};
}

export interface SetPortalURLParameters {
	url: string;
}

export interface SetPortalURLResponse {
	valid: true | string;
	url: string;
}

export interface TestPortalURLParameters extends SetPortalURLParameters {}

export interface TestPortalURLResponse extends SetPortalURLResponse {}
