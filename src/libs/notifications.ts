/**
 * Notifications API
 */

import { Observable } from 'rxjs'; // tslint:disable-line
import { HTTP } from '../http';

export class NotificationsAPI {
	constructor(private http: HTTP) { }

	unsubscribe() {
		return this.http.post('/notifications/unsubscribe');
	}

}
