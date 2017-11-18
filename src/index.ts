export interface MyMICDSOptions {
	baseURL: string;
	jwtGetter: () => string;
	jwtSetter: (jwt: string, remember: boolean) => void;
	jwtClear: () => void;
}

declare const localStorage: any;
declare const sessionStorage: any;

export const defaultOptions = {
	baseURL: 'https://api.mymicds.net',
	jwtGetter: () => {
		return sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
	},
	jwtSetter: (jwt: string, remember: boolean) => {
		if (remember) {
			localStorage.setItem('jwt');
		} else {
			sessionStorage.setItem('jwt');
		}
	},
	jwtClear: () => {
		localStorage.removeItem('jwt');
		sessionStorage.removeItem('jwt');
	}
};

export class MyMICDS {

	constructor() {
		//
	}

}
