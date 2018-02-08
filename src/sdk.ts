import { HTTP } from '@mymicds/http';
import { defaultOptions, MyMICDSOptions } from '@mymicds/options';

import { AliasAPI } from '@libs/alias';
import { AuthAPI } from '@libs/auth';
import { BackgroundAPI } from '@libs/background';
import { CanvasAPI } from '@libs/canvas';
import { ClassesAPI } from '@libs/classes';
import { DailyBulletinAPI } from '@libs/dailybulletin';
import { LunchAPI } from '@libs/lunch';
import { ModulesAPI } from '@libs/modules';
import { PortalAPI } from '@libs/portal';
import { ScheduleAPI } from '@libs/schedule';
import { TeachersAPI } from '@libs/teachers';
import { UserAPI } from '@libs/user';

export class MyMICDS {

	options: MyMICDSOptions;

	alias: AliasAPI;
	auth: AuthAPI;
	background: BackgroundAPI;
	canvas: CanvasAPI;
	classes: ClassesAPI;
	dailyBulletin: DailyBulletinAPI;
	modules: ModulesAPI;
	lunch: LunchAPI;
	portal: PortalAPI;
	schedule: ScheduleAPI;
	teachers: TeachersAPI;
	user: UserAPI;

	constructor(options: Partial<MyMICDSOptions>) {
		this.options = Object.assign({}, defaultOptions, options);

		const http = new HTTP(this.options);

		this.alias = new AliasAPI(http);
		this.auth = new AuthAPI(http, this.options);
		this.background = new BackgroundAPI(http);
		this.canvas = new CanvasAPI(http);
		this.classes = new ClassesAPI(http);
		this.dailyBulletin = new DailyBulletinAPI(http);
		this.modules = new ModulesAPI(http);
		this.lunch = new LunchAPI(http);
		this.portal = new PortalAPI(http);
		this.schedule = new ScheduleAPI(http);
		this.teachers = new TeachersAPI(http);
		this.user = new UserAPI(http);
	}

}
