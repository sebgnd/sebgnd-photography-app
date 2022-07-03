import { PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
	authorization: {
		token: string,
		ttl: number,
		error: boolean,
	}
};

export type SetTokenPayload = PayloadAction<{
	token: string,
}>;

