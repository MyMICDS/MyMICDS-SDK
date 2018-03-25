/**
 * Feeds API
 */

import { HTTP } from '../http';
import { Observable } from 'rxjs/Observable'; // tslint:disable-line

export class FeedsAPI {

	constructor(private http: HTTP) { }

	updateCanvasCache() {
		return this.http.post('/feeds/canvas-cache');
	}

	addPortalQueue() {
		return this.http.post('/feeds/portal-queue');
	}

}
