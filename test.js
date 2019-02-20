const { MyMICDS } = require('./dist');
const fs = require('fs');
const { Observable } = require('rxjs');
const { tap, switchMap } = require('rxjs/operators');

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
api.auth.login({ user: 'foo', password: 'bar' }).pipe(
	switchMap(() => api.canvas.getUniqueEvents())
).subscribe(
	data => console.log('Response', data),
	err => console.log('Error!', err)
);

api.auth.$.subscribe(
	auth => console.log('Auth', auth),
	err => console.log('Auth Error', err)
);

// api.suggestion.submit({ submission: 'holy shy SDK is done' }).subscribe(
// 	data => {
// 		console.log('data', data);
// 	},
// 	err => {
// 		console.log('error!', err);
// 	}
// );
