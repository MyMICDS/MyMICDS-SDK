/**
 * Auth API
 */

import { HTTP } from '../http';
import { MyMICDS } from '../sdk';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import * as decode from 'jwt-decode';

export class AuthAPI {

	private authSubject = new BehaviorSubject<PossiblyJWT>(undefined);
	$: Observable<PossiblyJWT> = this.authSubject.asObservable();
	snapshot: PossiblyJWT = undefined;

	get isLoggedIn() {
		return !!this.snapshot;
	}

	constructor(private http: HTTP, private mymicds: MyMICDS) {
		this.retrieveAndParseJWT().subscribe(parsed => {
			this.emitJWTStatus(parsed ? parsed.payload : null);
		});
	}

	login(param: LoginParameters, shouldError = false) {
		return this.http.post<LoginResponse>('/auth/login', shouldError, param).pipe(
			switchMap(res => {
				const parsed = AuthAPI.parseJWT(res.jwt);
				// If login successful, store JWT
				let loginAction: Observable<any> = of({});
				if (parsed) {
					loginAction = this.storeJWTAndEmitStatus(res.jwt, parsed.payload, param.remember);
				}
				return loginAction.pipe(map(() => res));
			})
		);
	}

	logout(shouldError = false) {
		return this.mymicds.getJwt().pipe(
			switchMap(jwt => {
				if (jwt) {
					return this.http.post('/auth/logout', shouldError);
				} else {
					// Already logged out. No need to logout with backend, just make sure there is not JWT.
					return of({});
				}
			}),
			switchMap(() => this.clearJwt())
		);
	}

	clearJwt() {
		return this.mymicds.clearJwt().pipe(
			tap(() => {
				this.snapshot = null;
				this.emitJWTStatus(null);
			})
		);
	}

	register(param: RegisterParameters, shouldError = false) {
		return this.http.post('/auth/register', shouldError, param);
	}

	confirm(param: ConfirmParameters, shouldError = false) {
		return this.http.post('/auth/confirm', shouldError, param);
	}

	changePassword(param: ChangePasswordParameters, shouldError = false) {
		return this.http.put('/auth/change-password', shouldError, param);
	}

	forgotPassword(param: ForgotPasswordParameters, shouldError = false) {
		return this.http.post('/auth/forgot-password', shouldError, param);
	}

	resetPassword(param: ResetPasswordParameters, shouldError = false) {
		return this.http.put('/auth/reset-password', shouldError, param);
	}

	verify(shouldError = false) {
		return this.http.get('/auth/verify', shouldError);
	}

	private retrieveAndParseJWT() {
		return this.mymicds.getJwt().pipe(
			switchMap(rawJWT => {
				if (!rawJWT) {
					return of(null);
				}
				const parsed = AuthAPI.parseJWT(rawJWT);
				// Check if JWT is invalid
				if (!parsed) {
					return this.mymicds.clearJwt().pipe(map(() => null));
				}
				return of(parsed);
			})
		);
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
		return this.mymicds.setJwt(jwt, remember).pipe(
			tap(() => this.emitJWTStatus(payload))
		);
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
