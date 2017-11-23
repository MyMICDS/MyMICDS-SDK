/**
 * Backgrounds API
 */

import { HTTP } from '@mymicds/http';
import { Observable } from 'rxjs/Observable';

export class BackgroundAPI {

	constructor(private http: HTTP) { }

	getBackground() {
		return this.http.post<GetBackgroundResponse>('/background/get');
	}

}

/**
 * API Parameters and Responses
 */

export interface GetBackgroundResponse {
	hasDefault: boolean;
	variants: {
		normal: string;
		blur: string;
	};
}

export interface DeleteBackgroundResponse extends GetBackgroundResponse { }

export interface UploadBackgroundParameters {
	file: File;
}

export interface UploadBackgroundResponse extends GetBackgroundResponse { }
