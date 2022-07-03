import axios, { Method } from 'axios';

export type RequestConfig = {
	method: Method,
	credentials?: boolean,
	body?: any,
};

export const instance = axios.create({
	baseURL: 'http://localhost:8000/api/',
});

export const request = (path: string, config: RequestConfig) => {
	return instance.request({
		withCredentials: config.credentials, 
		method: config.method,
		url: path,
		data: config.body,
	});
};
