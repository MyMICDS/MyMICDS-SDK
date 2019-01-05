/**
 * Auth API
 */

import { HTTP } from '../http';
import { MyMICDS } from '../sdk';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as decode from 'jwt-decode';

export class AuthAPI {

	private authSubject = new BehaviorSubject<JWT | null | undefined>(undefined);
	$: Observable<JWT | null | undefined> = this.authSubject.asObservable();
	snapshot: JWT | null | undefined = undefined;

	get isLoggedIn() {
		return !!this.snapshot;
	}

	constructor(private http: HTTP, private mymicds: MyMICDS) {
		const rawJWT = this.mymicds.options.jwtGetter();
		if (typeof rawJWT === 'string') {
			const parsed = decode(rawJWT);
			if (parsed) {
				this.snapshot = parsed as JWT;
				this.authSubject.next(this.snapshot);
			}
		}

		if (!rawJWT) {
			this.snapshot = null;
			this.authSubject.next(this.snapshot);
		}
	}

	login(param: LoginParameters) {
		return this.http.post<LoginResponse>('/auth/login', param).pipe(
			tap(res => {
				this.mymicds.options.jwtSetter(res.jwt, param.remember);
				const parsed = decode(res.jwt);
				if (parsed && typeof parsed !== 'string') {
					this.snapshot = parsed as JWT;
					this.authSubject.next(this.snapshot);
				}
			})
		);
	}

	logout() {
		let logoutAction: Observable<{}>;
		if (typeof this.mymicds.options.jwtGetter() === 'string') {
			logoutAction = this.http.post('/auth/logout');
		} else {
			// Already logged out. No need to logout with backend, just make sure there is not JWT.
			logoutAction = of({});
		}
		return logoutAction.pipe(
			tap(() => {
				this.clearJwt();
				this.authSubject.next(this.snapshot);
			})
		);
	}

	clearJwt() {
		this.mymicds.options.jwtClear();
		this.snapshot = null;
	}

	register(param: RegisterParameters) {
		return this.http.post('/auth/register', param);
	}

	confirm(param: ConfirmParameters) {
		return this.http.post('/auth/confirm', param);
	}

	changePassword(param: ChangePasswordParameters) {
		return this.http.post('/auth/change-password', param);
	}

	forgotPassword(param: ForgotPasswordParameters) {
		return this.http.post('/auth/forgot-password', param);
	}

	resetPassword(param: ResetPasswordParameters) {
		return this.http.put('/auth/reset-password', param);
	}

	verify() {
		return this.http.get('/auth/verify');
	}

}

/**
 * API Parameters and Responses
 */

export interface LoginParameters {
	user: string;
	password: string;
	remember?: boolean;
	comment?: string;
}

export interface LoginResponse {
	success: boolean;
	message: string;
	jwt: string;
}

export interface RegisterParameters {
	user: string;
	password: string;
	firstName: string;
	lastName: string;
	gradYear: number;
	teacher?: boolean;
}

export interface ConfirmParameters {
	user: string;
	hash: string;
}

export interface ChangePasswordParameters {
	oldPassword: string;
	newPassword: string;
}

export interface ForgotPasswordParameters {
	user: string;
}

export interface ResetPasswordParameters {
	user: string;
	password: string;
	hash: string;
}

/**
 * Helpers
 */

export interface JWT {
	user: string;
	scopes: { [scope: string]: true };
	aud: string;
	exp: number;
	iat: number;
	iss: string;
	sub: string;
}
