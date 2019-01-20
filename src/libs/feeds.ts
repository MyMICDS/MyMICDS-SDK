/**
 * Feeds API
 */

import { HTTP } from '../http';

export class FeedsAPI {

	constructor(private http: HTTP) { }

	updateCanvasCache() {
		return this.http.post('/feeds/canvas-cache');
	}

	addPortalQueue() {
		return this.http.post('/feeds/portal-queue');
	}

}
