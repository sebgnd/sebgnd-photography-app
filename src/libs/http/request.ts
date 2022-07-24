import axios, { Method } from 'axios';

import { isTokenValid } from 'libs/token/token';

export type RequestConfig = {
	method: Method,
	credentials?: boolean,
	body?: any,
};

export type RefreshTokenInterceptorConfig = {
	/**
	 * Endpoint called when refreshing the token. Allow to disable
	 * the interceptor since it is not needed when calling that endpoint.
	 */
	refreshTokenEndpoint: string,
	/**
	 * Method to get the authorization token from any source. Also used
	 * to get the new authorization token after having refreshed it.
	 */
	getAuthorizationToken: () => string,
	/**
	 * Method to refresh the authorization token. Must update the source directly.
	 * Its return value will not be used.
	 */
	updateRefreshToken: () => Promise<void>,
}

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

/**
 * Add the authorization token to every request and refresh it
 * when necessary.
 */
export const initializeAuthorizationInterceptor = (interceptorConfig: RefreshTokenInterceptorConfig) => {
	const {
		refreshTokenEndpoint,
		getAuthorizationToken,
		updateRefreshToken,
	} = interceptorConfig;

	return instance.interceptors.request.use(async (config) => {
		const isRefreshEndpoint = config.url === refreshTokenEndpoint;
		
		// Disable interceptor only when requesting refresh token enpoint
		if (isRefreshEndpoint) {
			return config;
		}
	
		const authorizationToken = getAuthorizationToken()
		const isValidInAMinute = authorizationToken
			? isTokenValid(authorizationToken, {
				in: '1min',
			})
			: false;
	
		if (!isValidInAMinute) {
			await updateRefreshToken();
		}
	
		const renewedTokenOrCurrentValid = getAuthorizationToken();
	
		return {
			...config,
			headers: {
				...config.headers,
				authorization: buildAuthorizationHeader(renewedTokenOrCurrentValid),
			}
		}
	});
}

export const ejectInterceptor = (interceptorId: number) => {
	instance.interceptors.request.eject(interceptorId);
}
