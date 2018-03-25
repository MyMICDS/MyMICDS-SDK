/**
 * Auth API
 */

import { HTTP } from '../http';
import { MyMICDSOptions } from '../options';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { decode } from 'jsonwebtoken';

export class AuthAPI {

	auth$: BehaviorSubject<AuthSnapshot>;
	authSnapshot: AuthSnapshot;

	constructor(private http: HTTP, private options: MyMICDSOptions) {
		const rawJwt = this.options.jwtGetter();
		let parsed = rawJwt ? decode(rawJwt) : undefined;
		if (parsed && typeof parsed !== 'string') { parsed = undefined; }
		this.authSnapshot = { jwt: parsed as JWT | undefined };
		this.auth$ = new BehaviorSubject(this.authSnapshot);
	}

	login(param: LoginParameters) {
		return this.http.post<LoginResponse>('/auth/login', param).pipe(
			tap(r => {
				this.options.jwtSetter(r.jwt, param.remember);
				const parsed = decode(r.jwt);
				if (parsed && typeof parsed !== 'string') {
					this.authSnapshot = {jwt: parsed as JWT};
					this.auth$.next(this.authSnapshot);
				}
			})
		);
	}

	logout() {
		return this.http.post('/auth/logout').pipe(
			tap(() => {
				this.options.jwtClear();
				this.authSnapshot = { jwt: undefined };
				this.auth$.next(this.authSnapshot);
			})
		);
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
		return this.http.post('/auth/reset-password', param);
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

export interface AuthSnapshot {
	jwt: JWT | undefined;
}

/**
 * Helpers
 */

export interface JWT {
	user: string;
	scope: string[];
	aud: string;
	exp: number;
	iat: number;
	iss: string;
	sub: string;
}
