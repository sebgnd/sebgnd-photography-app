import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { fetchAllCategories } from './category.thunk';
import { CategoryState, CategoryItem } from './category.types';

export const categoryAdapter = createEntityAdapter<CategoryItem>({
	selectId: (category) => category.id,
	sortComparer: (a, b) => a.displayName.localeCompare(b.displayName),
});

const initialState: CategoryState = {
	list: {
		items: categoryAdapter.getInitialState(),
		loading: false,
	}
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAllCategories.pending, (state) => {
			state.list.loading = true;
		});
		builder.addCase(fetchAllCategories.fulfilled, (state, { payload }) => {
			state.list.loading = false;
			categoryAdapter.setAll(state.list.items, payload.items.map((item) => ({
				id: item.id,
				displayName: item.displayName,
				name: item.name,
				thumbnailId: item.thumbnail.id,
			})));
		});
	}
});

export const { reducer, actions } = categorySlice;
