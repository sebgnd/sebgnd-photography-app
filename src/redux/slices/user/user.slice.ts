import { createSlice } from '@reduxjs/toolkit';

import { login, refreshToken } from './user.thunk';

import { UserState } from './user.types';

const initialState: UserState = {
  authorization: {
    error: false,
    token: '',
    loading: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearAuthenticationToken: (state) => {
      state.authorization = {
        error: false,
        token: '',
        loading: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.authorization.error = false;
        state.authorization.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.authorization.token = payload.token;
        state.authorization.error = false;
        state.authorization.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.authorization.error = true;
        state.authorization.loading = false;
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.authorization.token = payload.token;
        state.authorization.error = false;
      });
  },
});

export const { reducer, actions } = userSlice;
