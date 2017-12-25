/**
 * Portal API
 */

import { HTTP } from '@mymicds/http';
import { Observable } from 'rxjs/Observable';

export class PortalAPI {

	constructor(private http: HTTP) { }

	getClasses() {
		return this.http.get<GetPortalClassesResponse>('/portal/classes');
	}

	getDayRotation() {
		return this.http.get<GetPortalDayRotationResponse>('/portal/day-rotation');
	}

	setURL() {
		return this.http.put<SetPortalURLResponse>('/portal/url');
	}

	testURL() {
		return this.http.post<TestPortalURLResponse>('/portal/test');
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

export interface SetPortalURLResponse extends TestPortalURLResponse { }

export interface TestPortalURLResponse {
	valid: boolean;
	url: string;
}
