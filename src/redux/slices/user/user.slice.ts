import { createSlice } from '@reduxjs/toolkit';

import { login } from './user.thunk';

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
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, { payload }) => {
				state.authorization.token = payload.token;
				state.authorization.error = false;
			})
			.addCase(login.rejected, (state) => {
				state.authorization.error = true;
			});
	}
});

export const { reducer, actions } = userSlice;
