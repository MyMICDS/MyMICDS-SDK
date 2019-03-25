/**
 * Notifications API
 */

import { HTTP } from '../http';

export class NotificationsAPI {
	constructor(private http: HTTP) { }

	unsubscribe(param: UnsubscribeParameters, shouldError = false) {
		return this.http.post('/notifications/unsubscribe', shouldError, param);
	}

}

/**
 * API Parameters and Responses
 */

export interface UnsubscribeParameters {
	user: string;
	hash: string;
	type: string;
}
