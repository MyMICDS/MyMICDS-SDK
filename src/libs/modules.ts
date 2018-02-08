/**
 * Modules API
 */

import { HTTP } from '@mymicds/http';
import { Observable } from 'rxjs/Observable'; // tslint:disable-line

export class ModulesAPI {

	constructor(private http: HTTP) { }

	get() {
		return this.http.get<GetModulesResponse>('/modules');
	}

	update(param: UpdateModulesParameters) {
		return this.http.put<GetModulesResponse>('/modules', param);
	}

}

/**
 * API Parameters and Responses
 */

export interface GetModulesResponse {
	modules: MyMICDSModule[];
}

export interface UpdateModulesParameters {
	modules: MyMICDSModule[];
}

/**
 * Helpers
 */

export interface MyMICDSModule {
	type: string;
	row: number;
	width: number;
	height: number;
	options?: {
		[item: string]: any;
	};
}
