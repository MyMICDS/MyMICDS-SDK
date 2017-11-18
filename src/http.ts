import { APIResponse } from '@mymicds/api';
import { MyMICDSOptions } from '@mymicds/index';

import * as request from 'request';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class Http {

	constructor(private options: MyMICDSOptions) {
		//
	}

	// get(url: string) {
	//
	// }
	//
	// post() {
	//
	// }
	//
	// put() {
	//
	// }
	//
	// patch() {
	//
	// }
	//
	// delete() {
	//
	// }

	private http<T>(method: HTTP_METHOD, url: string, data: object) {
		const headers: { [key: string]: string } = {};
		const jwt = this.options.jwtGetter();
		if (jwt) {
			headers.Authorization = `Bearer ${this.options.jwtGetter()}`;
		}

		// If a GET request, use query parameters instead of JSON body (which doesn't exist on GET)
		let qs = {};
		let reqBody = {};
		if ([HTTP_METHOD.PATCH, HTTP_METHOD.POST, HTTP_METHOD.PUT].includes(method)) {
			reqBody = data;
		} else {
			qs = data;
		}

		return Observable.create((observer: Observer<T>) => {
			request({
				url,
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
