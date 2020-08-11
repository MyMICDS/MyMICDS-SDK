/**
 * Sticky Notes API
 */

import { HTTP } from '../http';

export class StickyNotesAPI {
	constructor(private http: HTTP) {}

	get(param: GetStickyNoteParameters, shouldError = false) {
		return this.http.get<GetStickyNoteResponse>('/stickynotes', shouldError, param);
	}

	add(param: AddStickyNoteParameters, shouldError = false) {
		return this.http.put('/stickynotes', shouldError, param);
	}
}

/**
 * API Parameters and Responses
 */

export interface GetStickyNoteParameters {
	moduleId: string;
}

export interface GetStickyNoteResponse {
	text: string;
	moduleId: string;
}

export interface AddStickyNoteParameters extends GetStickyNoteParameters {
	text: string;
}
