/**
 * Alias API
 */

import { HTTP } from '../http';

export class AliasAPI {
	constructor(private http: HTTP) {}

	add(param: AddAliasParameters, shouldError = false) {
		return this.http.post<AddAliasResponse>('/alias', shouldError, param);
	}

	list(shouldError = false) {
		return this.http.get<ListAliasesResponse>('/alias', shouldError);
	}

	delete(param: DeleteAliasParameters, shouldError = false) {
		return this.http.delete('/alias', shouldError, param);
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
	aliases: Record<AliasType, Alias[]>;
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
