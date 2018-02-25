import { HTTP } from '@sdk/http';
import { defaultOptions, MyMICDSOptions } from '@sdk/options';

import { AliasAPI } from '@libs/alias';
import { AuthAPI } from '@libs/auth';
import { BackgroundAPI } from '@libs/background';
import { CanvasAPI } from '@libs/canvas';
import { ClassesAPI } from '@libs/classes';
import { DailyBulletinAPI } from '@libs/dailybulletin';
import { DatesAPI } from '@libs/dates';
import { FeedsAPI } from '@libs/feeds';
import { LunchAPI } from '@libs/lunch';
import { ModulesAPI } from '@libs/modules';
import { PlannerAPI } from '@libs/planner';
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
	dates: DatesAPI;
	feeds: FeedsAPI;
	lunch: LunchAPI;
	modules: ModulesAPI;
	planner: PlannerAPI;
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
		this.dates = new DatesAPI(http);
		this.feeds = new FeedsAPI(http);
		this.lunch = new LunchAPI(http);
		this.modules = new ModulesAPI(http);
		this.planner = new PlannerAPI(http);
		this.portal = new PortalAPI(http);
		this.schedule = new ScheduleAPI(http);
		this.teachers = new TeachersAPI(http);
		this.user = new UserAPI(http);
	}

}
