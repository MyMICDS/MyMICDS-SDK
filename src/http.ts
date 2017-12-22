import { APIResponse } from '@mymicds/api-response';
import { MyMICDSError } from '@mymicds/error';
import { MyMICDSOptions } from '@mymicds/options';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as NodeFormData from 'form-data'; // This is really hacky so get ready

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class HTTP {

	constructor(private options: MyMICDSOptions) { }

	get<T>(endpoint: string, data?: Data) {
		return this.http<T>(HTTP_METHOD.GET, endpoint, data);
	}

	post<T>(endpoint: string, data?: Data) {
		return this.http<T>(HTTP_METHOD.POST, endpoint, data);
	}

	put<T>(endpoint: string, data?: Data) {
		return this.http<T>(HTTP_METHOD.PUT, endpoint, data);
	}

	patch<T>(endpoint: string, data?: Data) {
		return this.http<T>(HTTP_METHOD.PATCH, endpoint, data);
	}

	delete<T>(endpoint: string, data?: Data) {
		return this.http<T>(HTTP_METHOD.DELETE, endpoint, data);
	}

	private http<T>(method: HTTP_METHOD, endpoint: string, data: Data = {}): Observable<T> {
		const headers: { [key: string]: string } = {};
		const jwt = this.options.jwtGetter();
		if (jwt) {
			headers.Authorization = `Bearer ${jwt}`;
		}

		// If a GET request, use query parameters instead of JSON body (which doesn't exist on GET)
		let params = {};
		if (method === HTTP_METHOD.GET) {
			params = data;
			data = {};
		}

		return Observable.create(async (observer: Observer<T>) => {
			try {
				const response: AxiosResponse<APIResponse<T>> = await axios({
					url: endpoint,
					method,
					baseURL: this.options.baseURL,
					headers,
					params,
					data
				});

				observer.next(response.data.data!);
				observer.complete();
			} catch (err) {
				// Server-side error
				if (err.response) {
					// TypeScript doesn't allow type assertions in `catch` declarations, so we have to define an alias
					const resErr: AxiosResponse<APIResponse<T>> = err.response;
					observer.error(new MyMICDSError(resErr.data.error!, resErr.status, resErr.data.action));
					return;
				}
				// Sent the request fine, but no response
				if (err.request) {
					observer.error(new MyMICDSError('No response from MyMICDS. Try again later, it might be down!', null, null));
					return;
				}

				// Error sending the request
				observer.error(new MyMICDSError('Something went wrong with sending the request. Please try again!', null, null));
			}
		});
	}

	// _Platform-agnostic_ file upload
	uploadFile<T>(method: HTTP_METHOD, endpoint: string, data: Data = {}) {
		const config: AxiosRequestConfig = {
			url: endpoint,
			method,
			baseURL: this.options.baseURL
		};

		return Observable.create(async (observer: Observer<T>) => {
			// Platform detection
			if (typeof window !== 'undefined') {
				// Browser
				const form = new FormData();

				// TypeScript isn't letting me move this outside of the if statement
				// Because the call signature for FormData#append is slightly different to NodeFormData#append
				Object.keys(data).forEach(k => {
					form.append(k, data[k]);
				});

				config.data = form;
			} else {
				// Node
				const form = new NodeFormData();
				Object.keys(data).forEach(k => {
					form.append(k, data[k]);
				});

				try {
					// Not even going to bother with using getLength asynchronously
					// Don't want to have to deal with a callback function that only exists on the Node side
					config.headers = Object.assign({}, form.getHeaders(), { 'Content-Length': form.getLengthSync() });
				} catch (err) {
					observer.error(new MyMICDSError(`Error getting content length: ${err.message}`, null, null));
				}

				config.data = form;
			}

			const jwt = this.options.jwtGetter();
			if (jwt) {
				config.headers.Authorization = `Bearer ${jwt}`;
			}

			try {
				const response: AxiosResponse<APIResponse<T>> = await axios(config);

				observer.next(response.data.data!);
				observer.complete();
			} catch (err) {
				// Copypasterino from HTTP#http
				// Server-side error
				if (err.response) {
					// TypeScript doesn't allow type assertions in `catch` declarations, so we have to define an alias
					const resErr: AxiosResponse<APIResponse<T>> = err.response;
					observer.error(new MyMICDSError(resErr.data.error!, resErr.status, resErr.data.action));
					return;
				}
				// Sent the request fine, but no response
				if (err.request) {
					observer.error(new MyMICDSError('No response from MyMICDS. Try again later, it might be down!', null, null));
					return;
				}

				// Error sending the request
				observer.error(new MyMICDSError('Something went wrong with sending the request. Please try again!', null, null));
			}
		});
	}

}

export interface Data {
	[key: string]: any;
}

export enum HTTP_METHOD {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
}
