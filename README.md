# MyMICDS-SDK

The official TypeScript client for connecting to the MyMICDS API

## Installation

### NPM

```
$ npm install @mymicds/sdk
```

### CDN

For usage directly in the browser, add the following script tags to your HTML:

```html
<script src="https://unpkg.com/@reactivex/rxjs@6.2.1/dist/global/rxjs.umd.js"></script>
<script src="https://unpkg.com/@mymicds/sdk@1.14.0/dist/umd.js"></script>
```

Make sure to use the latest version of `@mymicds/sdk@<version>` from unpkg. See [example.html](example.html) for example usage.

## Usage

```typescript
import { MyMICDS, MyMICDSOptions } from '@mymicds/sdk';
import { mergeMap } from 'rxjs/operators';

const jwtStore = {
	jwt: null,
	remember: null
};

// You can pass a `MyMICDSOptions` object for configuring API client behavior
const options: MyMICDSOptions = {
	// URL for accessing MyMICDS API back-end
	baseURL: 'https://api.mymicds.net/v3',
	// How API client should retrieve any stored JWT
	// Return JWT string if available, otherwise return falsey value
	jwtGetter() {
		return jwtStore.jwt;
	},
	// How API client should save a JWT upon login
	// If `remember` is true, the JWT has a longer expiration and is intended to be saved in
	// long-term persistent storage (compared to being cleared after the current session is over).
	jwtSetter(jwt, remember) {
		jwtStore.jwt = jwt;
		jwtStore.remember = remember;
	},
	// How API client should delete a JWT
	// This is called upon logging out.
	jwtClear() {
		jwtStore.jwt = null;
		jwtStore.remember = null;
	},
	// Whether or not to activate observables for their respective modules (makes another API request on auth change)
	updateBackground: true, // Exposes MyMICDS.background.$ observable
	updateUserInfo: true // Exposes MyMICDS.user.$ observable
};

// These are the default configuration options if some/all of properties are omitted.
// Note that `localStorage` and `sessionStorage` may only be available in certain environments.
const defaultOptions: MyMICDSOptions = {
	baseURL: 'https://api.mymicds.net/v3',
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

// How to instantiate an API client with options
const mymicds = new MyMICDS(options);

// All API methods return RxJS Observables.
// Note that storing the JWT is automatically taken care of by the API client via the JWT getter and setter options.
mymicds.auth
	.login({ user: 'llyle', password: 'Hunter2' })
	.pipe(
		// Use `switchMap` to chain Observables!
		switchMap(() => mymicds.schedule.get())
	)
	.subscribe(
		data => {
			console.log('data', data);
		},
		err => {
			console.log('err', err);
		}
	);
```
