/**
 * Backgrounds API
 */

import { MyMICDSError } from '../error';
import { HTTP, HTTPMethod } from '../http';
import { MyMICDS } from '../sdk';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as stream from 'stream'; // For Node only

export class BackgroundAPI {

	DEFAULT_BACKGROUND: GetBackgroundResponse = {
		hasDefault: true,
		variants: {
			normal: `${this.mymicds.options.baseURL}/user-backgrounds/default/normal.jpg`,
			blur: `${this.mymicds.options.baseURL}/user-backgrounds/default/blur.jpg`
		}
	};

	private backgroundSubject = new BehaviorSubject<GetBackgroundResponse>(this.DEFAULT_BACKGROUND);
	$: Observable<GetBackgroundResponse>;
	snapshot: GetBackgroundResponse;

	constructor(private http: HTTP, private mymicds: MyMICDS) {
		if (mymicds.options.updateBackground) {
			this.$ = this.backgroundSubject.asObservable();
			this.mymicds.auth.$.pipe(
				switchMap(() => this.get())
			).subscribe(
				background => {
					this.snapshot = background;
					this.backgroundSubject.next(this.snapshot);
				},
				err => this.backgroundSubject.error(err)
			);
		} else {
			this.$ = throwError(
				new MyMICDSError('SDK is not configured to set up the background update! Set this in the initialization options.')
			);
		}
	}

	get() {
		return this.http.get<GetBackgroundResponse>('/background');
	}

	getAll() {
		return this.http.get<GetAllBackgroundsResponse>('/background/all');
	}

	upload(param: UploadBackgroundParameters) {
		return this.http.uploadFile<UploadBackgroundResponse>(HTTPMethod.PUT, '/background', param);
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
	background: File /* Browser */ | stream.Readable /* Node */;
}

export interface UploadBackgroundResponse extends GetBackgroundResponse { }

export interface DeleteBackgroundResponse extends GetBackgroundResponse { }
