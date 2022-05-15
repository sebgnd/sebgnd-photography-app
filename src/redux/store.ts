import { configureStore } from '@reduxjs/toolkit';

import { reducer as galleryReducer } from './slices/gallery/gallery.slice';

export const store = configureStore({
	reducer: {
		gallery: galleryReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;
