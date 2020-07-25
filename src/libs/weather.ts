/**
 * Weather API
 */

import { HTTP } from '../http';

import * as moment from 'moment';
import { tap } from 'rxjs/operators';

export class WeatherAPI {

	constructor(private http: HTTP) { }

	get(shouldError = false) {
		return this.http.get<GetWeatherResponse>('/weather', shouldError);
	}

	update(shouldError = false) {
		return this.http.post('/weather/update', shouldError);
	}

}

export interface GetWeatherResponse {
	weather: Weather;
}

export interface Weather { // all in fahrenheit, miles/hour, imperial
	temperature: number;
	temperatureHigh: number;
	temperatureLow: number;
	humidity: number;
	precipitationChance: number;
	windSpeed: number;
	windDir: number;
	weatherIcon: string;
}
