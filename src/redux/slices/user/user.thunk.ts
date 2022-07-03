import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from 'libs/http/request';

import { LoginResponse } from './user.types';

export const login = createAsyncThunk<LoginResponse, string>(
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
