/**
 * Modules API
 */

import { HTTP, StringDict } from '../http';

export class ModulesAPI {
	constructor(private http: HTTP) {}

	get(shouldError = false) {
		return this.http.get<GetModulesResponse>('/modules', shouldError);
	}

	update(param: UpdateModulesParameters, shouldError = false) {
		return this.http.put<GetModulesResponse>('/modules', shouldError, param);
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
	GPA_CALCULATOR = 'gpaCalculator',
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
