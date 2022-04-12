import { configureStore } from '@reduxjs/toolkit';

import { reducer as categoryReducer } from './slices/category/category.slice';

export const store = configureStore({
    reducer: {
        category: categoryReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
