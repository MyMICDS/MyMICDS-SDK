/**
 * Classes API
 */

import { HTTP } from '../http';
import { Teacher } from './teachers';

export class ClassesAPI {

	constructor(private http: HTTP) { }

	get(shouldError = false) {
		return this.http.get<GetClassesResponse>('/classes', shouldError);
	}

	add(param: AddClassParameters, shouldError = false) {
		return this.http.post<AddClassResponse>('/classes', shouldError, param);
	}

	delete(param: DeleteClassParameters, shouldError = false) {
		return this.http.delete('/classes', shouldError, param);
	}

}

/**
 * API Parameters and Responses
 */

export interface GetClassesResponse {
	classes: MyMICDSClass[];
}

export interface AddClassParameters {
	id?: string;
	name: string;
	color?: string;
	block?: Block;
	type?: ClassType;
	teacherPrefix: string;
	teacherFirstName: string;
	teacherLastName: string;
}

export interface AddClassResponse {
	id: string;
}

export interface DeleteClassParameters {
	id: string;
}

/**
 * Helpers
 */

export enum Block {
	A = 'a',
	B = 'b',
	C = 'c',
	D = 'd',
	E = 'e',
	F = 'f',
	G = 'g',
	SPORT = 'sport',
	OTHER = 'other'
}

export enum ClassType {
	ART = 'art',
	ENGLISH = 'english',
	HISTORY = 'history',
	MATH = 'math',
	SCIENCE = 'science',
	SPANISH = 'spanish',
	LATIN = 'latin',
	MANDARIN = 'mandarin',
	GERMAN = 'german',
	FRENCH = 'french',
	OTHER = 'other'
}

export interface ScheduleClass {
	name: string;
	teacher: Teacher;
	type: ClassType;
	block: Block;
	color: string;
	textDark: boolean;
}

export interface MyMICDSClass extends ScheduleClass {
	_id: string;
	user: string;
}
