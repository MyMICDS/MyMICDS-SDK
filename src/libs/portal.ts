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

	setURL(param: SetPortalURLParameters) {
		return this.http.put<SetPortalURLResponse>('/portal/url', param);
	}

	testURL(param: TestPortalURLParameters) {
		return this.http.post<TestPortalURLResponse>('/portal/test', param);
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
