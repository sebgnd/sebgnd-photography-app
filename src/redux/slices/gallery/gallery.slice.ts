import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import {
	fetchAllCategories,
	fetchImage,
	fetchImagesFromCategory,
	fetchImagesPaginated,
	uploadImages,
} from './gallery.thunk';
import { GalleryState, CategoryItem, ImageItem } from './gallery.types';

export const categoryAdapter = createEntityAdapter<CategoryItem>({
	selectId: (category) => category.id,
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
			hasPrevious: true,
			nextOffset: 0,
			previousOffset: 0,
			loading: false,
			hasNext: true,
			error: false,
			total: null,
		},
		edition: {
			upload: {
				loading: false,
				error: false,
			},
			statuses: {},
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
		clearImageSelection: ({ image }) => {
			image.selection.item = null;
		},
		clearImageList: ({ image }) => {
			imageAdapter.removeAll(image.list.items);
			image.list.hasNext = true;
			image.list.hasPrevious = true;
			image.list.nextOffset = 0;
			image.list.previousOffset = 0;
			image.list.total = null;
			image.list.error = false;
			image.list.loading = false;
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
		});

		builder.addCase(fetchImagesFromCategory.pending, ({ image }) => {
			image.list.loading = true;
			image.list.error = false;
			imageAdapter.removeAll(image.list.items);
		});

		builder.addCase(fetchImagesFromCategory.fulfilled, ({ image }, { payload }) => {
			image.list.loading = false;
			imageAdapter.setAll(image.list.items, payload.items.map((item) => ({
				id: item.id,
				type: item.type,
				categoryId: item.categoryId,
				createdAt: item.createdAt,
			})));
		});

		builder.addCase(fetchImagesFromCategory.rejected, ({ image }) => {
			image.list.error = true;
			image.list.loading = false;
		});

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

		builder.addCase(fetchImagesPaginated.pending, ({ image }, { meta }) => {
			image.list.loading = true;
			
			if (meta.arg.offset === 0) {
				imageAdapter.removeAll(image.list.items);
			}
		});

		builder.addCase(fetchImagesPaginated.fulfilled, ({ image }, { payload }) => {
			const { result, resetList } = payload;
			const { offset, total, limit } = result;

			image.list.loading = false;
			image.list.total = total;

			if (offset >= total || offset + limit <= 0) {
				return;
			}

			image.list = {
				...image.list,
				nextOffset: offset + limit,
				hasPrevious: offset !== 0,
				previousOffset: Math.max(offset - limit, 0),
				hasNext: offset + limit < total,
			};

			const newItems = result.items.map((img) => ({
				id: img.id,
				type: img.type,
				createdAt: img.createdAt,
				categoryId: img.categoryId,
			}));

			result.items.forEach((img) => {
				image.edition.statuses[img.id] = img.status;
			});

			if (resetList) {
				imageAdapter.setAll(image.list.items, newItems);
			} else {
				imageAdapter.upsertMany(image.list.items, newItems);	
			}
		});

		builder.addCase(uploadImages.pending, ({ image }) => {
			image.edition.upload.loading = true;
			image.edition.upload.error = false;
		});

		builder.addCase(uploadImages.fulfilled, ({ image }, { payload, meta }) => {
			// TODO: Handle pagination
			// TODO: Remove hard coded type
			const newItems = payload.items.map((image): ImageItem => {
				return {
					id: image.id,
					type: 'portrait',
					createdAt: image.createdAt,
					categoryId: meta.arg.categoryId,
				}
			});

			image.edition.upload.loading = false;

			payload.items.forEach(({ id, status }) => {
				image.edition.statuses[id] = image.edition.statuses[id] || status;
			});
			imageAdapter.upsertMany(image.list.items, newItems);
		});

		builder.addCase(uploadImages.rejected, ({ image }) => {
			image.edition.upload.error = true;
			image.edition.upload.loading = false;
		});
	}
});

export const { reducer, actions } = gallerySlice;
