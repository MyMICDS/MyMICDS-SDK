import { HTTP } from '@mymicds/http';
import { defaultOptions, MyMICDSOptions } from '@mymicds/options';

import { AuthAPI } from '@libs/auth';
import { BackgroundAPI } from '@libs/background';

export class MyMICDS {

	options: MyMICDSOptions;

	auth: AuthAPI;
	background: BackgroundAPI;

	constructor(options: Partial<MyMICDSOptions>) {
		this.options = Object.assign({}, options, defaultOptions);

		const http = new HTTP(this.options);

		this.auth = new AuthAPI(http, this.options);
		this.background = new BackgroundAPI(http);
	}

}
