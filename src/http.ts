import { APIResponse } from '@mymicds/api-response';
import { MyMICDSError } from '@mymicds/error';
import { MyMICDSOptions } from '@mymicds/options';

import 'isomorphic-fetch';
import 'isomorphic-form-data';
import * as qs from 'qs';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class HTTP {

	constructor(private options: MyMICDSOptions) { }

	get<T>(endpoint: string, data?: Data) {
		return this.http<T>(HTTPMethod.GET, endpoint, data);
	}

	post<T>(endpoint: string, data?: Data) {
		return this.http<T>(HTTPMethod.POST, endpoint, data);
	}

	put<T>(endpoint: string, data?: Data) {
		return this.http<T>(HTTPMethod.PUT, endpoint, data);
	}

	patch<T>(endpoint: string, data?: Data) {
		return this.http<T>(HTTPMethod.PATCH, endpoint, data);
	}

	delete<T>(endpoint: string, data?: Data) {
		return this.http<T>(HTTPMethod.DELETE, endpoint, data);
	}

	/**
	 * Generic wrapper for regular API requests
	 */

	private http<T>(method: HTTPMethod, endpoint: string, data: Data = {}): Observable<T> {
		// If a GET request, use query parameters instead of JSON body
		let body = JSON.stringify(data);
		let query = '';
		if (method === HTTPMethod.GET) {
			query = `?${qs.stringify(data)}`;
			body = '';
		}

		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		const jwt = this.options.jwtGetter();
		if (jwt) {
			headers.append('Authorization', `Bearer ${jwt}`);
		}

		return this.fetchApi<T>(`${this.options.baseURL}${endpoint}${query}`, {
			method,
			body,
			headers
		});
	}

	/**
	 * Platform-agnostic file upload
	 */

	uploadFile<T>(method: HTTPMethod, endpoint: string, data: Data = {}): Observable<T> {
		// No GET requests for file upload
		if (method === HTTPMethod.GET) {
			return Observable.throw(
				new MyMICDSError('Trying to upload a file using a GET request! Your code is broke!', null, null)
			);
		}

		const headers = new Headers();
		headers.append('Accept', 'application/json');
		const jwt = this.options.jwtGetter();
		if (jwt) {
			headers.append('Authorization', `Bearer ${jwt}`);
		}

		const form = new FormData();
		Object.keys(data).forEach(k => {
			form.append(k, data[k]);
		});

		return this.fetchApi<T>(`${this.options.baseURL}${endpoint}`, {
			method,
			body: form,
			headers
		});
	}

	/**
	 * Wrapper around the Fetch API for any back-end API request.
	 * Unpacks API data or returns MyMICDSError object
	 */

	private fetchApi<T>(url: string, options: Data): Observable<T> {
		return Observable.create(async (observer: Observer<T>) => {
			try {
				const response = await fetch(url, options);
				const resData = await response.json();

				if (!response.ok) {
					// Generic error message if for some reason there's no supplied error in body
					let error = 'Something went wrong handling that request. Please try again or contact support@mymicds.net!';
					if (resData.error) {
						error = resData.error;
					}
					observer.error(new MyMICDSError(error, response.status, resData.action));
				} else {
					observer.next(resData.data!);
				}
				observer.complete();
			} catch (err) {
				// There was a network error
				observer.error(
					new MyMICDSError(
						'Something went wrong connecting to MyMICDS. Please try again or contact support@mymicds.net!',
						null,
						null
					)
				);
				observer.complete();
			}
		});
	}
}

export interface Data {
	[key: string]: any;
}

export enum HTTPMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
}
