/**
 * Alias API
 */

import { Observable } from 'rxjs'; // tslint:disable-line
import { HTTP } from '../http';

export class AliasAPI {

	constructor(private http: HTTP) { }

	add(param: AddAliasParameters) {
		return this.http.post<AddAliasResponse>('/alias', param);
	}

	list() {
		return this.http.get<ListAliasesResponse>('/alias');
	}

	delete(param: DeleteAliasParameters) {
		return this.http.delete('/alias', param);
	}

}

/**
 * API Parameters and Responses
 */

export interface AddAliasParameters {
	type: AliasType;
	classString: string;
	classId: string;
}

export interface AddAliasResponse {
	id: string;
}

export interface ListAliasesResponse {
	aliases: Record<AliasType, Alias>;
}

export interface DeleteAliasParameters {
	type: AliasType;
	id: string;
}

/**
 * Helpers
 */

export enum AliasType {
	CANVAS = 'canvas',
	PORTAL = 'portal'
}

export interface Alias {
	_id: string;
	user: string;
	type: AliasType;
	classNative: string;
	classRemote: string;
}
