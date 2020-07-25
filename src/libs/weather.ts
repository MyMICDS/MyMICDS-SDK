/**
 * Weather API
 */

import { HTTP } from '../http';

import * as moment from 'moment';
import { tap } from 'rxjs/operators';

export class WeatherAPI {

	constructor(private http: HTTP) { }

	get(shouldError = false) {
		return this.http.get<GetWeatherResponse>('/weather', shouldError).pipe(
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

	update(shouldError = false) {
		return this.http.post('/weather/update', shouldError);
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
		'nearest-station': number;
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

export interface SimplifiedWeather { // all in fahrenheit, miles/hour, imperial
	temperature: number;
	temperatureHigh: number;
	temperatureLow: number;
	humidity: number;
	percipitationChance: number;
	windSpeed: number;
	windDir: number;
	weatherIcon: string;

	// constructor(openWeatherData: OpenWeather) {
	// 	this.temperature = openWeatherData.current.temp;
	// 	this.temperatureHigh = openWeatherData.daily[0].temp.max ?? 0;
	// 	this.temperatureLow = openWeatherData.daily[0].temp.min ?? 0;
	// 	this.humidity = openWeatherData.current.humidity;
	// 	this.percipitationChance = openWeatherData.hourly[0].pop;
	// 	this.windSpeed = openWeatherData.hourly[0].wind_speed;
	// 	this.windDir = openWeatherData.hourly[0].wind_deg;
	// 	this.weatherIcon = openWeatherData.current.weather[0].id;
	// }
}

// note there is a "minutely" array, but our Open Weather request excludes it
export interface OpenWeather {
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	current: OpenWeatherCurrentSnapshot;
	hourly: OpenWeatherHourSnapshot[];
	daily: OpenWeatherDaySnapshot[];
}

export interface OpenWeatherCurrentSnapshot {
	dt: moment.Moment;
	sunrise: moment.Moment;
	sunset: moment.Moment;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	clouds: number;
	uvi: number;
	visibility: number;
	wind_speed: number;
	wind_gust: number | null;
	wind_deg: number;
	rain: number | PercipitationVolume;
	snow: number | PercipitationVolume;
	weather: OpenWeatherSummary[];
}

export interface OpenWeatherHourSnapshot {
	dt: moment.Moment;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_gust: number | null;
	wind_deg: number;
	rain: number | PercipitationVolume;
	snow: number | PercipitationVolume;
	pop: number;
	weather: OpenWeatherSummary[];
}

export interface OpenWeatherDaySnapshot {
	dt: moment.Moment;
	sunrise: moment.Moment;
	sunset: moment.Moment;
	temp: TemperatureDaySnapshot;
	feels_like: TemperatureDaySnapshot;
	pressure: number;
	humidity: number;
	dew_point: number;
	clouds: number;
	uvi: number;
	visibility: number;
	wind_speed: number;
	wind_gust: number | null;
	wind_deg: number;
	pop: number;
	rain: number | PercipitationVolume | null;
	snow: number | PercipitationVolume | null;
	weather: OpenWeatherSummary[];
}

export interface OpenWeatherSummary {
	id: string;
	main: string;
	description: string;
	icon: string;
}

export interface PercipitationVolume {
	h1: number;
}

export interface TemperatureDaySnapshot {
	morn: number;
	day: number;
	eve: number;
	night: number;
	min: number | null;
	max: number | null;
}
