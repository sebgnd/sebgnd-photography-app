import { createSlice } from '@reduxjs/toolkit';

import { UserState, SetUserPayload } from './user.types';

const initialState: UserState = {
	firstName: '',
	lastName: '',
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, { payload }: SetUserPayload) => {
			state.firstName = payload.firstName;
			state.lastName = payload.lastName;
		},
	}
});

export const { reducer, actions } = userSlice;
