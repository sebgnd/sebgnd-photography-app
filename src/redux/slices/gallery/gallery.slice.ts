import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import {fetchAllCategories, fetchImage, fetchImagesFromCategory, fetchImagesPaginated} from './gallery.thunk';
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

		return dateB.getTime() - dateA.getTime();
	}
})

const initialState: GalleryState = {
	category: {
		list: {
			items: categoryAdapter.getInitialState(),
			loading: false,
			error: false,
		},
		selectedCategoryName: null,
	},
	image: {
		list: {
			items: imageAdapter.getInitialState(),
			loading: false,
			error: false,
			total: null,
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
	reducers: {
		clearImageList: ({ image }) => {
			imageAdapter.removeAll(image.list.items);
		},
		clearImageSelection: ({ image }) => {
			image.selection.item = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllCategories.pending, ({ category }) => {
			category.list.loading = true;
			category.list.error = false;
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
		builder.addCase(fetchAllCategories.rejected, ({ category }) => {
			category.list.error = true;
			category.list.loading = false;
			
		})
		builder.addCase(fetchImagesFromCategory.pending, ({ image }) => {
			image.list.loading = true;
			image.list.error = false;
		});
		builder.addCase(fetchImagesFromCategory.fulfilled, ({ image }, { payload }) => {
			image.list.loading = false;
			imageAdapter.setAll(image.list.items, payload.items.map((item) => ({
				id: item.id,
				type: item.type,
				categoryId: item.categoryId,
				createdAt: item.createdAt,
			})))
		});
		builder.addCase(fetchImagesFromCategory.rejected, ({ image }) => {
			image.list.error = true;
			image.list.loading = false;
		})
		builder.addCase(fetchImage.pending, ({ image }) => {
			image.selection.item = null;
			image.selection.loading = true;
		});
		builder.addCase(fetchImage.fulfilled, ({ image }, { payload }) => {
			image.selection.item = {
				id: payload.id,
				exif: payload.exif
					? {
						iso: payload.exif.iso,
						shutterSpeed: payload.exif.shutterSpeed,
						focalLength: payload.exif.focalLength,
						aperture: payload.exif.aperture,
					}
					: undefined,
			};
			image.selection.loading = false;
		});
		builder.addCase(fetchImagesPaginated.pending, ({ image }) => {
			image.list.loading = true;
		});
		builder.addCase(fetchImagesPaginated.fulfilled, ({ image }, { payload }) => {
			image.list.loading = false;
			image.list.total = payload.total;
			imageAdapter.upsertMany(image.list.items, payload.items.map((img) => ({
				id: img.id,
				type: img.type,
				createdAt: img.createdAt,
				categoryId: img.categoryId,
			})));
		});
	}
});

export const { reducer, actions } = gallerySlice;
