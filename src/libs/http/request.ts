import axios, { Method } from 'axios';

import { isTokenValid } from 'libs/token/token';
import { store } from 'redux/store';

import { refreshToken } from 'redux/slices/user/user.thunk';
import { selectUserToken } from 'redux/slices/user/user.selector';

/**
 * Think about a way to decouple the request from redux.
 */

export type RequestConfig = {
	method: Method,
	credentials?: boolean,
	body?: any,
};

const instance = axios.create({
	baseURL: 'http://localhost:8000/api/',
});

export const buildAuthorizationHeader = (token: string) => `Bearer ${token}`;

export const request = (path: string, config: RequestConfig) => {
	return instance.request({
		withCredentials: config.credentials, 
		method: config.method,
		url: path,
		data: config.body,
	});
};

instance.interceptors.request.use(async (config) => {
	const isAdminPage = window.location.pathname.match(/\/admin\/(?!.*login).*/);
	const isRefreshEndpoint = config.url === 'iam/token/refresh';

	// TODO: Find a more flexible way to have the admin path (router, ...)
	if (!isAdminPage || isRefreshEndpoint) {
		return config;
	}

	const authorizationToken = selectUserToken(store.getState());
	const isValidInAMinute = authorizationToken
		? isTokenValid(authorizationToken, {
			in: '1min',
		})
		: false;

	if (!isValidInAMinute) {
		await store.dispatch(refreshToken());
	}

	const renewedTokenOrCurrentValid = selectUserToken(store.getState());

	return {
		...config,
		headers: {
			...config.headers,
			authorization: buildAuthorizationHeader(renewedTokenOrCurrentValid),
		}
	}
});
