import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { fetchAllCategories } from './category.thunk';
import { GalleryState, CategoryItem, ImageItem } from './gallery.types';

export const categoryAdapter = createEntityAdapter<CategoryItem>({
	selectId: (category) => category.name,
	sortComparer: (a, b) => a.displayName.localeCompare(b.displayName),
});

export const imageAdapter = createEntityAdapter<ImageItem>({
	selectId: (image) => image.id,
	sortComparer: (a, b) => {
		const dateA = new Date(a.createdAt);
		const dateB = new Date(b.createdAt);

		return dateA.getTime() - dateB.getTime();
	}
})

const initialState: GalleryState = {
	category: {
		list: {
			items: categoryAdapter.getInitialState(),
			loading: false,
		},
	},
	image: {
		list: {
			items: imageAdapter.getInitialState(),
			loading: false,
		},
		selection: {
			item: null,
			loading: false,
		}
	}
};

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAllCategories.pending, (state) => {
			state.category.list.loading = true;
		});
		builder.addCase(fetchAllCategories.fulfilled, ({ category }, { payload }) => {
			category.list.loading = false;
			categoryAdapter.setAll(category.list.items, payload.items.map((item) => ({
				id: item.id,
				displayName: item.displayName,
				name: item.name,
				thumbnailId: item.thumbnail.id,
			})));
		});
	}
});

export const { reducer, actions } = gallerySlice;
