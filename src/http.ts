import 'isomorphic-fetch';

import { APIResponse } from '@mymicds/api-response';
import { MyMICDSError } from '@mymicds/error';
import { MyMICDSOptions } from '@mymicds/options';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class HTTP {

	constructor(private options: MyMICDSOptions) { }

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
				// TODO
				// const response = await fetch({ /* ... */ }).then(r => r.json());
			} catch (err) {
				// TODO
			}
		});
	}

}

enum HTTP_METHOD {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
}
