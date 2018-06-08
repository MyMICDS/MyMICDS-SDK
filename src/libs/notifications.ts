/**
 * Notifications API
 */

import { Observable } from 'rxjs/Observable';
import { HTTP } from '../http';

export class NotificationsAPI {
	constructor(private http: HTTP) { }

	unsubscribe() {
		return this.http.post('/notifications/unsubscribe');
	}

}
