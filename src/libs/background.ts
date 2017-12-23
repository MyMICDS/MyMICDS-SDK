/**
 * Backgrounds API
 */

import { HTTP, HTTP_METHOD } from '@mymicds/http';
import { Observable } from 'rxjs/Observable';

export class BackgroundAPI {

	constructor(private http: HTTP) { }

	get() {
		return this.http.get<GetBackgroundResponse>('/background');
	}

	getAll() {
		return this.http.get<GetAllBackgroundsResponse>('/background/all');
	}

	upload(param: UploadBackgroundParameters) {
		return this.http.uploadFile<UploadBackgroundResponse>(HTTP_METHOD.PUT, '/background', param);
	}

	delete() {
		return this.http.delete<DeleteBackgroundResponse>('/background');
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

export interface GetAllBackgroundsResponse {
	backgrounds: {
		[user: string]: GetBackgroundResponse;
	};
}

export interface UploadBackgroundParameters {
	background: File /* Browser */ | ReadableStream /* Node */;
}

export interface UploadBackgroundResponse extends GetBackgroundResponse { }

export interface DeleteBackgroundResponse extends GetBackgroundResponse { }
