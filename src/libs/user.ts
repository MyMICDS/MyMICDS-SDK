/**
 * User API
 */

import { MyMICDSError } from '../error';
import { HTTP } from '../http';
import { MyMICDS } from '../sdk';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export class UserAPI {

	private userSubject = new BehaviorSubject<PossiblyUserInfo>(undefined);
	$: Observable<PossiblyUserInfo> = this.userSubject.asObservable();
	snapshot: PossiblyUserInfo = undefined;

	constructor(private http: HTTP, private mymicds: MyMICDS) {
		if (mymicds.options.updateUserInfo) {
			this.mymicds.auth.$.pipe(
				switchMap((auth): Observable<PossiblyUserInfo> => {
					if (auth === undefined || auth === null) {
						return of(auth);
					}
					return this.getInfo();
				})
			).subscribe(
				userInfo => this.propagateUserInfo(userInfo),
				err => this.userSubject.error(err)
			);
		} else {
			this.$ = throwError(
				new MyMICDSError('SDK is not configured to set up the user info update! Set this in the initialization options.')
			);
		}
	}

	gradYearToGrade(param: GradYearToGradeParameters, shouldError = false) {
		return this.http.get<GradYearToGradeResponse>('/user/grad-year-to-grade', shouldError, param);
	}

	gradeToGradYear(param: GradeToGradYearParameters, shouldError = false) {
		return this.http.get<GradeToGradYearResponse>('/user/grade-to-grad-year', shouldError, param);
	}

	getGradeRange(shouldError = false) {
		return this.http.get<GetGradeRangeResponse>('/user/grade-range', shouldError);
	}

	getInfo(shouldError = false) {
		return this.http.get<GetUserInfoResponse>('/user/info', shouldError)
			.pipe(tap(userInfo => this.propagateUserInfo(userInfo)));
	}

	changeInfo(param: ChangeUserInfoParameters, shouldError = false) {
		return this.http.patch<ChangeUserInfoResponse>('/user/info', shouldError, param);
	}

	private propagateUserInfo(userInfo: GetUserInfoResponse | null | undefined) {
		this.snapshot = userInfo;
		this.userSubject.next(this.snapshot);
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

export interface ChangeUserInfoResponse extends GetUserInfoResponse { }

/**
 * Helpers
 */

type PossiblyUserInfo = GetUserInfoResponse | null | undefined;

export type School = 'lowerschool' | 'middleschool' | 'upperschool';
