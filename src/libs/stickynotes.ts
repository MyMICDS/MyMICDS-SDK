/**
 * Sticky Notes API
 */

import { HTTP } from '@sdk/http';
import { Observable } from 'rxjs/Observable'; // tslint:disable-line

export class StickyNotesAPI {

	constructor(private http: HTTP) { }

	get(param: GetStickyNoteParameters) {
		return this.http.get<GetStickyNoteResponse>('/stickynotes', param);
	}

	add(param: AddStickyNoteParameters) {
		return this.http.put('/stickynotes', param);
	}

}

/**
 * API Parameters and Responses
 */

export interface GetStickyNoteParameters {
	moduleId: string;
}

export interface GetStickyNoteResponse {
	stickynote: {
		text: string;
		moduleId: string;
	};
}

export interface AddStickyNoteParameters extends GetStickyNoteParameters {
	text: string;
}
