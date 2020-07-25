/**
 * Weather API
 */

import { HTTP } from '../http';

import * as moment from 'moment';
import { tap } from 'rxjs/operators';

export class WeatherAPI {

	constructor(private http: HTTP) { }

	get(shouldError = false) {
		return this.http.get<WeatherResponse>('/weather', shouldError);
	}

	update(shouldError = false) {
		return this.http.post('/weather/update', shouldError);
	}

}

export interface WeatherResponse {
	weather: Weather;
}

export interface Weather { // all in fahrenheit, miles/hour, imperial
	temperature: number;
	temperatureHigh: number;
	temperatureLow: number;
	humidity: number;
	percipitationChance: number;
	windSpeed: number;
	windDir: number;
	weatherIcon: string;
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
