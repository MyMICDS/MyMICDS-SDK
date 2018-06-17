/**
 * Modules API
 */

import { Observable } from 'rxjs/Observable';
import { HTTP, StringDict } from '../http';

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
	column: number;
	width: number;
	height: number;
	options?: StringDict;
}
