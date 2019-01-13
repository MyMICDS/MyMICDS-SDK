/**
 * Auth API
 */

import { HTTP } from '../http';
import { MyMICDS } from '../sdk';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as decode from 'jwt-decode';

export class AuthAPI {

	private authSubject = new BehaviorSubject<PossiblyJWT>(undefined);
	$: Observable<PossiblyJWT> = this.authSubject.asObservable();
	snapshot: PossiblyJWT = undefined;

	get isLoggedIn() {
		return !!this.snapshot;
	}

	constructor(private http: HTTP, private mymicds: MyMICDS) {
		const parsed = this.retrieveAndParseJWT();
		this.emitJWTStatus(parsed ? parsed.payload : null);
	}

	login(param: LoginParameters) {
		return this.http.post<LoginResponse>('/auth/login', param).pipe(
			tap(res => {
				const parsed = AuthAPI.parseJWT(res.jwt);
				if (parsed) {
					this.storeJWTAndEmitStatus(res.jwt, parsed.payload, param.remember);
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
			})
		);
	}

	clearJwt() {
		this.mymicds.options.jwtClear();
		this.snapshot = null;
		this.emitJWTStatus(null);
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

	private retrieveAndParseJWT() {
		const rawJWT = this.mymicds.options.jwtGetter();
		if (!rawJWT) {
			return null;
		}
		const parsed = AuthAPI.parseJWT(rawJWT);
		// Check if JWT is invalid
		if (!parsed) {
			this.mymicds.options.jwtClear();
			return null;
		}
		return parsed;
	}

	private static parseJWT(rawJWT: string): ParsedJWT | null {
		if (typeof rawJWT !== 'string') {
			return null;
		}

		try {
			const parsed = decode(rawJWT) as JWT;
			if (parsed && typeof parsed === 'object') {
				return { rawJWT, payload: parsed };
			}
			return null;
		} catch (err) {
			return null;
		}
	}

	private storeJWTAndEmitStatus(jwt: string, payload: JWT, remember?: boolean) {
		this.mymicds.options.jwtSetter(jwt, remember);
		this.emitJWTStatus(payload);
	}

	private emitJWTStatus(payload: JWT | null) {
		this.snapshot = payload;
		this.authSubject.next(this.snapshot);
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

type PossiblyJWT = JWT | null | undefined;

export interface ParsedJWT {
	rawJWT: string;
	payload: JWT;
}

export interface JWT {
	user: string;
	scopes: { [scope: string]: true };
	aud: string;
	exp: number;
	iat: number;
	iss: string;
	sub: string;
}
