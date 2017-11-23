/**
 * Backgrounds API
 */

import { HTTP } from '@mymicds/http';
import { defaultOptions, MyMICDSOptions } from '@mymicds/index';

import { Observable } from 'rxjs/Observable';

export class BackgroundsAPI {

	constructor(private options: MyMICDSOptions) { }

	getBackground(): Observable<BackgroundGetResponse> {
		return this.http.post('/background/get', {});
	}

}

/**
 * API Parameters and Responses
 */

export interface BackgroundGetResponse {
	hasDefault: boolean;
	variants: {
		normal: string;
		blur: string;
	};
}

export interface BackgroundDeleteResponse extends BackgroundGetResponse { }

export interface BackgroundUploadParameter {
	file: File;
}

export interface BackgroundUploadResponse extends BackgroundGetResponse { }
