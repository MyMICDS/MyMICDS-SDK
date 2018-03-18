# MyMICDS-SDK
This is a TypeScript client made for connecting to the MyMICDS API.

## Installation
Just run `npm install @mymicds/sdk` in your JavaScript/TypeScript project's root folder.

## Usage
```typescript
import { MyMICDS, MyMICDSOptions } from '@mymicds/sdk';
import { mergeMap } from 'rxjs/operators';

const jwtStore = {
	jwt: ''
};
// When instantiating an instance of the `MyMICDS` object, you must pass in an options object
// Any of these keys can be omitted and the defaults will be used in their place.
const options: MyMICDSOptions = {
	baseURL: 'https://api.mymicds.net/v2',
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

// By default, it will assume a browser environment and use these options:
const defaultOptions: MyMICDSOptions = {
	baseURL: 'https://api.mymicds.net/v2',
	jwtGetter() {
		return sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
	},
	jwtSetter(jwt: string, remember: boolean) {
		if (remember) {
			localStorage.setItem('jwt', jwt);
		} else {
			sessionStorage.setItem('jwt', jwt);
		}
	},
	jwtClear() {
		localStorage.removeItem('jwt');
		sessionStorage.removeItem('jwt');
	}
};

const mymicds = new MyMICDS(options);

// All API routes return Observables
mymicds.auth.login({ user: 'foo', password: 'hunter2' }).pipe(
	// Use `mergeMap` to chain Observables!
	mergeMap(() => mymicds.schedule.get())
).subscribe(
	data => {
		console.log('data', data);
	},
	err => {
		console.log('err', err);
	}
)
```
