/**
 * Modules API
 */

import { Observable } from 'rxjs'; // tslint:disable-line
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

export enum MyMICDSModuleType {
	BOOKMARKS = 'bookmarks',
	COUNTDOWN = 'countdown',
	PROGRESS = 'progress',
	SCHEDULE = 'schedule',
	SIMPLIFIED_LUNCH = 'simplifiedLunch',
	SIMPLIFIED_SCHEDULE = 'simplifiedSchedule',
	SNOWDAY = 'snowday',
	STICKY_NOTES = 'stickynotes',
	TWITTER = 'twitter',
	WEATHER = 'weather'
}

export interface MyMICDSModule {
	type: MyMICDSModuleType;
	row: number;
	column: number;
	width: number;
	height: number;
	options?: StringDict;
}
