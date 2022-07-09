import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from 'libs/http/request';

import { TokenResponse } from './user.types';

export const login = createAsyncThunk<TokenResponse, string>(
	'user/login',
	async (idToken: string) => {
		const response = await request('iam/login/google', {
			method: 'POST',
			credentials: true,
			body: { idToken },
		});

		return response.data;
	}
);

export const refreshToken = createAsyncThunk<TokenResponse>(
	'user/refreshToken',
	async () => {
		const response = await request('iam/token/refresh', {
			method: 'POST',
			credentials: true,
		});

		return response.data;
	}
);

