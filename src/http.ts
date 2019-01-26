import { MyMICDS } from './sdk';
import { APIResponse } from './api-response';
import { MyMICDSError } from './error';
import { MyMICDSOptions } from './options';

import 'isomorphic-fetch';
import 'isomorphic-form-data';
import * as qs from 'qs';
import { Observable, Observer, Subject, throwError } from 'rxjs';

export class HTTP {

	private errorsSubject = new Subject<MyMICDSError>();
	errors = this.errorsSubject.asObservable();

	constructor(private sdk: MyMICDS) { }

	get<T>(endpoint: string, data?: StringDict) {
		return this.http<T>(HTTPMethod.GET, endpoint, data);
	}

	post<T>(endpoint: string, data?: StringDict) {
		return this.http<T>(HTTPMethod.POST, endpoint, data);
	}

	put<T>(endpoint: string, data?: StringDict) {
		return this.http<T>(HTTPMethod.PUT, endpoint, data);
	}

	patch<T>(endpoint: string, data?: StringDict) {
		return this.http<T>(HTTPMethod.PATCH, endpoint, data);
	}

	delete<T>(endpoint: string, data?: StringDict) {
		return this.http<T>(HTTPMethod.DELETE, endpoint, data);
	}

	/**
	 * Generic wrapper for regular API requests
	 */

	private http<T>(method: HTTPMethod, endpoint: string, data: StringDict = {}): Observable<T> {
		// If a GET request, use query parameters instead of JSON body
		let body: string | null = JSON.stringify(data);
		let query = '';
		if (method === HTTPMethod.GET) {
			if (Object.keys(data).length > 0) {
				query = `?${qs.stringify(data)}`;
			}
			body = null;
		}

		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		const jwt = this.sdk.options.jwtGetter();
		if (jwt) {
			headers.append('Authorization', `Bearer ${jwt}`);
		}

		return this.fetchApi<T>(`${this.sdk.options.baseURL}${endpoint}${query}`, {
			method,
			body,
			headers
		});
	}

	/**
	 * Platform-agnostic file upload
	 */

	uploadFile<T>(method: HTTPMethod, endpoint: string, data: StringDict = {}): Observable<T> {
		// No GET requests for file upload
		if (method === HTTPMethod.GET) {
			return throwError(
				new MyMICDSError('Trying to upload a file using a GET request! Your code is broke!', null, null, endpoint)
			);
		}

		const headers = new Headers();
		headers.append('Accept', 'application/json');
		const jwt = this.sdk.getJwt();
		if (jwt) {
			headers.append('Authorization', `Bearer ${jwt}`);
		}

		const form = new FormData();
		Object.keys(data).forEach(k => {
			form.append(k, data[k]);
		});

		return this.fetchApi<T>(`${this.sdk.options.baseURL}${endpoint}`, {
			method,
			body: form,
			headers
		});
	}

	/**
	 * Wrapper around the Fetch API for any back-end API request.
	 * Unpacks API data or returns MyMICDSError object
	 */

	private fetchApi<T>(url: string, options: StringDict): Observable<T> {
		return Observable.create(async (observer: Observer<T>) => {
			try {
				const response = await fetch(url, options);
				const resData: APIResponse<T> = await response.json();

				if (!response.ok) {
					// Generic error message if for some reason there's no supplied error in body
					let errorMessage = 'Something went wrong handling that request. Please try again or contact support@mymicds.net!';
					if (resData.error) {
						errorMessage = resData.error;
					}
					const error = new MyMICDSError(errorMessage, response.status, resData.action, url);
					observer.error(error);
					this.errorsSubject.next(error);
				} else {
					observer.next(resData.data!);
				}
				observer.complete();
			} catch (err) {
				// There was a network error
				const error = new MyMICDSError(
					// tslint:disable:max-line-length
					`Something went wrong connecting to MyMICDS. Please try again or contact support@mymicds.net! (${err.message})`,
					null,
					null,
					url
				);
				observer.error(error);
				this.errorsSubject.next(error);
				observer.complete();
			}
		});
	}
}

export interface StringDict {
	[key: string]: any;
}

export enum HTTPMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
}
