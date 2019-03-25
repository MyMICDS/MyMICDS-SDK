/**
 * Feeds API
 */

import { HTTP } from '../http';

export class FeedsAPI {

	constructor(private http: HTTP) { }

	updateCanvasCache(shouldError = false) {
		return this.http.post('/feeds/canvas-cache', shouldError);
	}

	addPortalQueue(shouldError = false) {
		return this.http.post('/feeds/portal-queue', shouldError);
	}

}
