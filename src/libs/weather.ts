/**
 * Weather API
 */

import { HTTP } from '../http';

import * as moment from 'moment';
import { Observable } from 'rxjs/Observable'; // tslint:disable-line
import { tap } from 'rxjs/operators';

export class WeatherAPI {

	constructor(private http: HTTP) { }

	get() {
		return this.http.get<GetWeatherResponse>('/weather').pipe(
			tap(r => {
				const w = r.weather;

				w.currently.time = moment.unix(w.currently.time as any);

				for (const minute of w.minutely.data) {
					minute.time = moment.unix(minute.time as any);
				}

				// Oof
				for (const day of w.daily.data) {
					day.sunriseTime = moment.unix(day.sunriseTime as any);
					day.sunsetTime = moment.unix(day.sunsetTime as any);
					day.precipIntensityMaxTime = moment.unix(day.precipIntensityMaxTime as any);
					day.temperatureHighTime = moment.unix(day.temperatureHighTime as any);
					day.temperatureLowTime = moment.unix(day.temperatureLowTime as any);
					day.apparentTemperatureHighTime = moment.unix(day.apparentTemperatureHighTime as any);
					day.apparentTemperatureLowTime = moment.unix(day.apparentTemperatureLowTime as any);
					day.windGustTime = moment.unix(day.windGustTime as any);
					day.uvIndexTime = moment.unix(day.uvIndexTime as any);
					day.temperatureMinTime = moment.unix(day.temperatureMinTime as any);
					day.temperatureMaxTime = moment.unix(day.temperatureMaxTime as any);
					day.apparentTemperatureMinTime = moment.unix(day.apparentTemperatureMinTime as any);
					day.apparentTemperatureMaxTime = moment.unix(day.apparentTemperatureMaxTime as any);
				}
			})
		);
	}

	update() {
		return this.http.post('/weather/update');
	}

}

/**
 * API Parameters and Responses
 */

export interface GetWeatherResponse {
	weather: Weather;
}

/**
 * Helpers
 */

export interface Weather {
	latitude: number;
	longitude: number;
	timezone: string;
	currently: HourlyWeatherSnapshot;
	minutely: WeatherDataGroup<MinutelyWeatherSnapshot>;
	hourly: WeatherDataGroup<HourlyWeatherSnapshot>;
	daily: WeatherDataGroup<DailyWeatherSnapshot>;
	flags: {
		sources: string[];
		'isd-stations': string[];
		units: string;
	};
	offset: number;
}

export interface SummaryIcon {
	summary: string;
	icon: string;
}

export interface WeatherDataGroup<T> extends SummaryIcon {
	data: T[];
}

export interface MinutelyWeatherSnapshot {
	time: moment.Moment;
	precipIntensity: number;
	precipProbability: number;
}

export interface HourlyWeatherSnapshot extends SummaryIcon, MinutelyWeatherSnapshot {
	nearestStormDistance: number;
	nearestStormBearing: number;
	temperature: number;
	apparentTemperature: number;
	dewPoint: number;
	humidity: number;
	pressure: number;
	windSpeed: number;
	windGust: number;
	windBearing: number;
	cloudCover: number;
	uvIndex: number;
	visibility: number;
	ozone: number;
}

export interface DailyWeatherSnapshot extends HourlyWeatherSnapshot {
	sunriseTime: moment.Moment;
	sunsetTime: moment.Moment;
	moonPhase: number;
	precipIntensityMax: number;
	precipIntensityMaxTime: moment.Moment;
	temperatureHigh: number;
	temperatureHighTime: moment.Moment;
	temperatureLow: number;
	temperatureLowTime: moment.Moment;
	apparentTemperatureHigh: number;
	apparentTemperatureHighTime: moment.Moment;
	apparentTemperatureLow: number;
	apparentTemperatureLowTime: moment.Moment;
	windGustTime: moment.Moment;
	uvIndexTime: moment.Moment;
	temperatureMin: number;
	temperatureMinTime: moment.Moment;
	temperatureMax: number;
	temperatureMaxTime: moment.Moment;
	apparentTemperatureMin: number;
	apparentTemperatureMinTime: moment.Moment;
	apparentTemperatureMax: number;
	apparentTemperatureMaxTime: moment.Moment;
}
