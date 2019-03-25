import { APIResponse } from './api-response';
import { MyMICDSError } from './error';
import { MyMICDS } from './sdk';

import * as promise from 'es6-promise';
promise.polyfill();
import 'fetch-everywhere';
import 'isomorphic-form-data';
import * as qs from 'qs';
import { from, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export class HTTP {

	private errorsSubject = new Subject<MyMICDSError>();
	errors = this.errorsSubject.asObservable();

	constructor(private mymicds: MyMICDS) { }

	get<T>(endpoint: string, shouldError: boolean, data?: StringDict) {
		return this.http<T>(HTTPMethod.GET, endpoint, shouldError, data);
	}

	post<T>(endpoint: string, shouldError: boolean, data?: StringDict) {
		return this.http<T>(HTTPMethod.POST, endpoint, shouldError, data);
	}

	put<T>(endpoint: string, shouldError: boolean, data?: StringDict) {
		return this.http<T>(HTTPMethod.PUT, endpoint, shouldError, data);
	}

	patch<T>(endpoint: string, shouldError: boolean, data?: StringDict) {
		return this.http<T>(HTTPMethod.PATCH, endpoint, shouldError, data);
	}

	delete<T>(endpoint: string, shouldError: boolean, data?: StringDict) {
		return this.http<T>(HTTPMethod.DELETE, endpoint, shouldError, data);
	}

	/**
	 * Generic wrapper for regular API requests
	 */

	private http<T>(method: HTTPMethod, endpoint: string, shouldError: boolean, data: StringDict = {}): Observable<T> {
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

		return this.fetchApi<T>(`${this.mymicds.options.baseURL}${endpoint}${query}`, {
			method,
			body,
			headers
		}, shouldError);
	}

	/**
	 * Platform-agnostic file upload
	 */

	uploadFile<T>(method: HTTPMethod, endpoint: string, shouldError: boolean, data: StringDict = {}): Observable<T> {
		// No GET requests for file upload
		if (method === HTTPMethod.GET) {
			return throwError(
				new MyMICDSError('Trying to upload a file using a GET request! Your code is broke!', null, null, endpoint)
			);
		}

		const form = new FormData();
		Object.keys(data).forEach(k => {
			form.append(k, data[k]);
		});

		return this.fetchApi<T>(`${this.mymicds.options.baseURL}${endpoint}`, {
			method,
			body: form
		}, shouldError);
	}

	/**
	 * Wrapper around the Fetch API for any back-end API request.
	 * Unpacks API data or returns MyMICDSError object
	 */

	private fetchApi<T>(url: string, options: StringDict, shouldError: boolean): Observable<T> {
		return this.mymicds.getJwt().pipe(
			switchMap(jwt => {

				if (!options.headers) {
					options.headers = new Headers();
				}
				options.headers.append('Accept', 'application/json');
				if (jwt) {
					options.headers.append('Authorization', `Bearer ${jwt}`);
				}

				return from(fetch(url, options));
			}),
			switchMap(response => {
				return from(response.json()).pipe(
					// Pass on both response data and the response object itself
					map((resData: APIResponse<T>) => {
						return { response, resData };
					})
				);
			}),
			catchError(() => {
				throw new MyMICDSError(
					'There was a problem communicating with MyMICDS. Please try again or contact support@mymicds.net!',
					null,
					null,
					url
				);
			}),
			map(({ response, resData }) => {
				if (!response.ok) {
					// Generic error message if for some reason there's no supplied error in body
					let errorMessage = 'Something went wrong handling that request. Please try again or contact support@mymicds.net!';
					if (resData.error) {
						errorMessage = resData.error;
					}
					console.log('get response action', resData);
					throw new MyMICDSError(errorMessage, response.status, resData.action, url);
				}

				return resData.data!;
			}),
			catchError(error => {
				this.errorsSubject.next(error);
				if (shouldError) {
					throw error;
				} else {
					return new Observable<T>();
				}
			})
		);
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
