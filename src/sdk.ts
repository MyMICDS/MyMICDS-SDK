import { defaultOptions, MyMICDSOptions } from '@mymicds/options';

import { Auth } from '@libs/auth';
import { Background } from '@libs/background';

export class MyMICDS {

	options: MyMICDSOptions;

	auth: Auth;
	background: Background;

	constructor(options: Partial<MyMICDSOptions>) {
		this.options = Object.assign({}, options, defaultOptions);

		this.auth = new Auth(this.options);
		this.background = new Background(this.options);
	}

}
