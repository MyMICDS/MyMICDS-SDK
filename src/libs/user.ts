/**
 * User API
 */

import { Observable } from 'rxjs/Observable';
import { HTTP } from '../http';

export class UserAPI {

	constructor(private http: HTTP) { }

	gradYearToGrade(param: GradYearToGradeParameters) {
		return this.http.get<GradYearToGradeResponse>('/user/grad-year-to-grade', param);
	}

	gradeToGradYear(param: GradeToGradYearParameters) {
		return this.http.get<GradeToGradYearResponse>('/user/grade-to-grad-year', param);
	}

	getGradeRange() {
		return this.http.get<GetGradeRangeResponse>('/user/grade-range');
	}

	getInfo() {
		return this.http.get<GetUserInfoResponse>('/user/info');
	}

	changeInfo(param: ChangeUserInfoParameters) {
		return this.http.patch('/user/info', param);
	}

}

/**
 * API Parameters and Responses
 */

export interface GradYearToGradeParameters {
	year: number;
}

export interface GradYearToGradeResponse {
	grade: number;
}

export interface GradeToGradYearParameters {
	grade: number;
}

export interface GradeToGradYearResponse {
	year: number;
}

export interface GetGradeRangeResponse {
	gradYears: number[];
}

export interface GetUserInfoResponse {
	user: string;
	password: string;
	firstName: string;
	lastName: string;
	gradYear: number;
	grade: number;
	school: School;
	canvasURL: string | null;
	portalURL: string | null;
}

export interface ChangeUserInfoParameters {
	firstName?: string;
	lastName?: string;
	gradYear?: number;
	teacher?: boolean;
}

/**
 * Helpers
 */

export type School = 'lowerschool' | 'middleschool' | 'upperschool';
