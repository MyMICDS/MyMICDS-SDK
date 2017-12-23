const { MyMICDS } = require('./dist');
const fs = require('fs');
const { Observable } = require('rxjs/Observable');
const { tap, mergeMap } = require('rxjs/operators');

const jwtStore = {};
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

const path = '/Users/michaelgira/Google Drive/Programming/test images/Expand+dong+comp+_44af51_5261181.jpg';

fs.readFile(path, (err, file) => {
	if (err) throw err;

	const api = new MyMICDS(options);
	api.auth.login({ user: 'foo', password: 'bar' }).pipe(
		tap(ting => {
			console.log('login', ting);
		}),
		mergeMap(() => api.background.upload({
			// background: file
			background: fs.createReadStream(path)
		})),
		mergeMap(() => api.background.get()),
		tap(ting => {
			console.log('get background', ting);
		})
	).subscribe(
		data => {
			console.log('data', data);
		},
		err => {
			console.log('error!', err);
		}
	);
});
