import { HTTP } from '@mymicds/http';
import { Observable } from 'rxjs/Observable'; // tslint:disable-line

export class DailyBulletinAPI {
    constructor(private http: HTTP) { }

    getList() {
        return this.http.get<getListResponse>('/daily-bulletin');
    }

}

export interface getListResponse {
    baseURL: string;
    bulletins: string[];
}
