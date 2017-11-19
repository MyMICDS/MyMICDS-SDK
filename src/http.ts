import { APIResponse } from '@mymicds/api';
import { MyMICDSOptions } from '@mymicds/index';

import * as request from 'request';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class HTTP {

	constructor(private options: MyMICDSOptions) {
		// TODO
	}

	// NOTE: I wish this could be done in a DRYer way, but unfortunately, it can't if you want to keep strong types
	get<T>(endpoint: string, data: object) {
		return this.http<T>(HTTP_METHOD.GET, endpoint, data);
	}

	post<T>(endpoint: string, data: object) {
		return this.http<T>(HTTP_METHOD.POST, endpoint, data);
	}

	put<T>(endpoint: string, data: object) {
		return this.http<T>(HTTP_METHOD.PUT, endpoint, data);
	}

	patch<T>(endpoint: string, data: object) {
		return this.http<T>(HTTP_METHOD.PATCH, endpoint, data);
	}

	delete<T>(endpoint: string, data: object) {
		return this.http<T>(HTTP_METHOD.DELETE, endpoint, data);
	}

	private http<T>(method: HTTP_METHOD, endpoint: string, data: object): Observable<T> {
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
				// If client-side error
				if (err) {
					observer.error(err);
					return;
				}

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
