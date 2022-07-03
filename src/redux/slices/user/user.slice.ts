import { createSlice } from '@reduxjs/toolkit';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { UserState, SetTokenPayload } from './user.types';

const initialState: UserState = {
	authorization: {
		error: false,
		token: '',
		ttl: 0,
	},
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setToken: (state, { payload }: SetTokenPayload) => {
			state.authorization.error = false;

			try {
				const decoded = jwt.decode(payload.token) as JwtPayload;
				const { exp } = decoded;

				state.authorization.ttl = exp!;
				state.authorization.token = payload.token;
			} catch (err) {
				state.authorization.error = true;
			}
		},
	}
});

export const { reducer, actions } = userSlice;
