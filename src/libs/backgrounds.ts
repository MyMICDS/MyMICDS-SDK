/**
 * Backgrounds API
 */

import { HTTP } from '@mymicds/http';
import { defaultOptions, MyMICDSOptions } from '@mymicds/index';

import { Observable } from 'rxjs/Observable';

export class BackgroundsAPI {

	private options: MyMICDSOptions;

	constructor(options: Partial<MyMICDSOptions>, private http: HTTP) {
		this.options = Object.assign({}, options, defaultOptions);
	}

	getBackground(): Observable<BackgroundGetResponse> {
		return this.http.post('/background/get', {});
	}

}

/**
 * API Parameters and Responses
 */

export interface BackgroundGetParameter {
}

export interface BackgroundGetResponse {
	error: string;
	variants?: {
		normal: string;
		blur: string;
	};
	hasDefault?: boolean;
}

export interface BackgroundUploadParameter {
	file: File;
}

export type BackgroundUploadResponse = BackgroundGetResponse;

export interface BackgroundDeleteParameter {
}

export type BackgroundDelteResponse = BackgroundGetResponse;
