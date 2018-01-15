/**
 * Auth API
 */

import { HTTP } from '@mymicds/http';
import { MyMICDSOptions } from '@mymicds/options';
import { Observable } from 'rxjs/Observable'; // tslint:disable-line
import { tap } from 'rxjs/operators';

export class AuthAPI {

	constructor(private http: HTTP, private options: MyMICDSOptions) { }

	login(param: LoginParameters) {
		return this.http.post<LoginResponse>('/auth/login', param).pipe(
			tap(r => this.options.jwtSetter(r.jwt, param.remember))
		);
	}

	logout() {
		return this.http.post('/auth/logout').pipe(
			tap(() => this.options.jwtClear())
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

/**
 * Helpers
 */

// export interface JWT {
// 	user: string;
// 	scope: string[];
// 	aud: string;
// 	exp: number;
// 	iat: number;
// 	iss: string;
// 	sub: string;
// }
