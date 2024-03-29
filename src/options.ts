declare const localStorage: Storage;
declare const sessionStorage: Storage;

export interface MyMICDSOptions {
	baseURL: string;
	jwtGetter(): string | null | Promise<string | null>;
	jwtSetter(jwt: string, remember?: boolean): void | Promise<void>;
	jwtClear(): void | Promise<void>;
	updateBackground: boolean;
	updateUserInfo: boolean;
}

export const defaultOptions: MyMICDSOptions = {
	baseURL: 'https://api.mymicds.net/v3',
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
	},
	updateBackground: true,
	updateUserInfo: true
};
