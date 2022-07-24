import { PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
	authorization: {
		token: string,
		error: boolean,
	}
};

export type SetTokenPayload = PayloadAction<{
	token: string,
}>;

export type TokenResponse = {
	token: string,
};

