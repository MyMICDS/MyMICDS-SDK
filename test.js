const { MyMICDS } = require('./dist');
const fs = require('fs');
const { Observable } = require('rxjs/Observable');
const { tap, mergeMap } = require('rxjs/operators');

const jwtStore = {
	jwt: ''
};
const options = {
	baseURL: 'http://localhost:1420',
	jwtGetter() {
		return jwtStore.jwt;
	},
	jwtSetter(jwt, remember) {
		jwtStore.jwt = jwt;
		jwtStore.remember = remember;
	},
	jwtClear() {
		delete jwtStore.jwt;
		delete jwtStore.remember;
	}
};

const api = new MyMICDS(options);
api.suggestion.submit({ submission: 'holy shy SDK is done' }).subscribe(
	data => {
		console.log('data', data);
	},
	err => {
		console.log('error!', err);
	}
);
