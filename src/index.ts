export interface MyMICDSOptions {
	baseURL: string;
	jwtGetter(): string | null;
	jwtSetter(jwt: string, remember: boolean): void;
	jwtClear(): void;
}

declare const localStorage: Storage;
declare const sessionStorage: Storage;

export const defaultOptions: MyMICDSOptions = {
	baseURL: 'https://api.mymicds.net',
	jwtGetter() {
		return sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
	},
	jwtSetter(jwt: string, remember: boolean) {
		if (remember) {
			localStorage.setItem('jwt', jwt);
		} else {
			sessionStorage.setItem('jwt', jwt);
		}
	},
	jwtClear() {
		localStorage.removeItem('jwt');
		sessionStorage.removeItem('jwt');
	}
};

export class MyMICDS {

	constructor() {
		//
	}

}
