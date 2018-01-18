import { HTTP } from '@mymicds/http';
import { defaultOptions, MyMICDSOptions } from '@mymicds/options';

import { AuthAPI } from '@libs/auth';
import { BackgroundAPI } from '@libs/background';
import { CanvasAPI } from '@libs/canvas';
import { DailyBulletinAPI } from '@libs/dailybulletin';
import { ModulesAPI } from '@libs/modules';

export class MyMICDS {

	options: MyMICDSOptions;

	auth: AuthAPI;
	background: BackgroundAPI;
	canvas: CanvasAPI;
	dailyBulletin: DailyBulletinAPI;
	modules: ModulesAPI;

	constructor(options: Partial<MyMICDSOptions>) {
		this.options = Object.assign({}, defaultOptions, options);

		const http = new HTTP(this.options);

		this.auth = new AuthAPI(http, this.options);
		this.background = new BackgroundAPI(http);
		this.canvas = new CanvasAPI(http);
		this.dailyBulletin = new DailyBulletinAPI(http);
		this.modules = new ModulesAPI(http);
	}

}
