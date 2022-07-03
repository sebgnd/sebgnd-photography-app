import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { reducer as galleryReducer } from './slices/gallery/gallery.slice';
import { reducer as userReducer } from './slices/user/user.slice';

export const store = configureStore({
	reducer: {
		gallery: galleryReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
