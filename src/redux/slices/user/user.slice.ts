import { createSlice } from '@reduxjs/toolkit';

import { login, refreshToken } from './user.thunk';

import { UserState } from './user.types';

const initialState: UserState = {
	authorization: {
		error: false,
		token: '',
	},
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearAuthenticationToken: (state) => {
			state.authorization = {
				error: false,
				token: '',
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, { payload }) => {
				state.authorization.token = payload.token;
				state.authorization.error = false;
			})
			.addCase(refreshToken.fulfilled, (state, { payload }) => {
				state.authorization.token = payload.token;
				state.authorization.error = false;
			})
	}
});

export const { reducer, actions } = userSlice;
