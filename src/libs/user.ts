/**
 * User API
 */

import { MyMICDSError } from '../error';
import { HTTP } from '../http';
import { MyMICDS } from '../sdk';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export class UserAPI {

	private userSubject = new BehaviorSubject<GetUserInfoResponse | null | undefined>(undefined);
	$: Observable<GetUserInfoResponse | null | undefined>;
	snapshot: GetUserInfoResponse | null | undefined;

	constructor(private http: HTTP, private mymicds: MyMICDS) {
		if (mymicds.options.updateUserInfo) {
			this.$ = this.userSubject.asObservable();
			this.mymicds.auth.$.pipe(
				switchMap(() => this.getInfo())
			).subscribe(
				userInfo => {
					this.snapshot = userInfo;
					this.userSubject.next(this.snapshot);
				},
				err => this.userSubject.error(err)
			);
		} else {
			this.$ = throwError(
				new MyMICDSError('SDK is not configured to set up the user info update! Set this in the initialization options.')
			);
		}
	}

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
	gradYear: number | null;
	grade: number | null;
	school: School;
	canvasURL: string | null;
	portalURL: string | null;
	portalURLClasses: string | null;
	portalURLCalendar: string | null;
	migrateToVeracross: boolean;
}

export interface ChangeUserInfoParameters {
	firstName?: string;
	lastName?: string;
	gradYear?: number | null;
	teacher?: boolean;
}

/**
 * Helpers
 */

export type School = 'lowerschool' | 'middleschool' | 'upperschool';
