/**
 * Auth API
 */

import { HTTP } from '@mymicds/http';
import { MyMICDSOptions } from '@mymicds/options';
import { Observable } from 'rxjs/Observable';

export class AuthAPI {

	constructor(private http: HTTP, private options: MyMICDSOptions) { }

	login(param: LoginParameters) {
		return this.http.post<LoginResponse>('/auth/login');
	}

	logout() {
		return this.http.post('/auth/logout');
		// @TODO Clear JWT
	}

}

/**
 * API Parameters and Responses
 */

export interface LoginParameters {
	user: string;
	password: string;
	remember: boolean;
}

export interface LoginResponse {
	success: boolean;
	message: string;
	jwt: JWT;
}

export interface RegisterParameters {
	user: string;
	password: string;
	firstName: string;
	lastName: string;
	gradYear: number;
}

export interface ConfirmParameters {
	user: string;
	hash: string;
}

export interface ChangePasswordsParameters {
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
	scope: string[];
	aud: string;
	exp: number;
	iat: number;
	iss: string;
	sub: string;
}
