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
import { QuotesAPI } from '@libs/quotes';
import { ScheduleAPI } from '@libs/schedule';
import { SnowdayAPI } from '@libs/snowday';
import { TeachersAPI } from '@libs/teachers';
import { UserAPI } from '@libs/user';
import { WeatherAPI } from '@libs/weather';
import { SportsAPI } from '@libs/sports';

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
	quotes: QuotesAPI;
	schedule: ScheduleAPI;
	snowday: SnowdayAPI;
	sports: SportsAPI;
	teachers: TeachersAPI;
	user: UserAPI;
	weather: WeatherAPI;

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
		this.quotes = new QuotesAPI(http);
		this.schedule = new ScheduleAPI(http);
		this.snowday = new SnowdayAPI(http);
		this.sports = new SportsAPI(http);
		this.teachers = new TeachersAPI(http);
		this.user = new UserAPI(http);
		this.weather = new WeatherAPI(http);
	}

}
