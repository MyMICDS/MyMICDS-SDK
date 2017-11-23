import { APIResponse } from '@mymicds/api-response';
import { MyMICDSError } from '@mymicds/error';
import { defaultOptions, MyMICDSOptions } from '@mymicds/options';

import * as request from 'request';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class HTTP {

	private options: MyMICDSOptions;

	constructor(options: Partial<MyMICDSOptions>) {
		this.options = Object.assign({}, options, defaultOptions);
	}

	get<T>(endpoint: string, data?: object) {
		return this.http<T>(HTTP_METHOD.GET, endpoint, data);
	}

	post<T>(endpoint: string, data?: object) {
		return this.http<T>(HTTP_METHOD.POST, endpoint, data);
	}

	put<T>(endpoint: string, data?: object) {
		return this.http<T>(HTTP_METHOD.PUT, endpoint, data);
	}

	patch<T>(endpoint: string, data?: object) {
		return this.http<T>(HTTP_METHOD.PATCH, endpoint, data);
	}

	delete<T>(endpoint: string, data?: object) {
		return this.http<T>(HTTP_METHOD.DELETE, endpoint, data);
	}

	private http<T>(method: HTTP_METHOD, endpoint: string, data: object = {}): Observable<T> {
		const headers: { [key: string]: string } = {};
		const jwt = this.options.jwtGetter();
		if (jwt) {
			headers.Authorization = `Bearer ${this.options.jwtGetter()}`;
		}

		// If a GET request, use query parameters instead of JSON body (which doesn't exist on GET)
		let qs = {};
		let reqBody = {};
		if (method === HTTP_METHOD.GET) {
			qs = data;
		} else {
			reqBody = data;
		}

		return Observable.create((observer: Observer<T>) => {
			request({
				url: endpoint,
				baseUrl: this.options.baseURL,
				method,
				headers,
				qs,
				body: reqBody,
				json: true,
				gzip: true
			}, (err, res, body: APIResponse<T>) => {
				// If server-side error
				// (Check first because 500 could also be API error which we would rather display than generic 500)
				if (body && body.error) {
					observer.error(new MyMICDSError(body.error, res.statusCode!, body.action));
					return;
				}

				// If client-side error
				if (err) {
					observer.error(err);
					return;
				}

				observer.next(body.data!);
				observer.complete();
			});
		});
	}

}

enum HTTP_METHOD {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	PATCH = 'patch',
	DELETE = 'delete'
}
