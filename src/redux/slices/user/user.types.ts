import { PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
	firstName: string,
	lastName: string,
};

export type SetUserPayload = PayloadAction<{
	firstName: string,
	lastName: string,
}>;

