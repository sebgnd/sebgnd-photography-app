import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import {
	deleteImage,
	fetchAllCategories,
	fetchImage,
	fetchImagesFromCategory,
	fetchImagesPaginated,
	uploadImages,
	setCategoryThumbnail,
} from './gallery.thunk';
import {
	GalleryState,
	CategoryItem,
	ImageItem,
	SetImageProcessStatus,
} from './gallery.types';
import { reduceImageStatuses } from './gallery.utils';


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
});

/**
 * Maybe it would be better to seperate the edition state from
 * the reading / viewing (BackOffice / FrontOffice)
 */
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
			hasNext: false,
			hasPrevious: false,
			total: null,
			nextOffset: 0,
			previousOffset: 0,
			loading: false,
			error: false,
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
		clearImageSelection: (state) => {
			const { image } = state;

			image.selection.item = null;
		},
		clearImageList: (state) => {
			const { image } = state;

			imageAdapter.removeAll(image.list.items);
			image.list = {
				...image.list,
				hasNext: false,
				hasPrevious: false,
				nextOffset: 0,
				previousOffset: 0,
				total: null,
				error: false,
				loading: false,
			}
		},
		setImageProcessStatus: (state, { payload }: SetImageProcessStatus) => {
			const { id, status } = payload;
			const { image } = state;

			image.edition.statuses[id] = status;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllCategories.pending, ({ category }) => {
			category.list = {
				...category.list,
				loading: true,
				error: false,
			}
		});

		builder.addCase(fetchAllCategories.fulfilled, ({ category }, { payload }) => {
			const { items } = category.list;

			category.list.loading = false;

			categoryAdapter.setAll(items, payload.items.map(
				(item) => ({
					id: item.id,
					displayName: item.displayName,
					name: item.name,
					thumbnailId: item.thumbnail.id,
				})
			));
		});

		builder.addCase(fetchAllCategories.rejected, ({ category }) => {
			category.list = {
				...category.list,
				error: true,
				loading: false,
			}
		});

		builder.addCase(fetchImagesFromCategory.pending, (state) => {
			const { image } = state;
			const { items } = image.list;

			imageAdapter.removeAll(items);
			image.list = {
				...image.list,
				loading: true,
				error: false,
			}
		});

		builder.addCase(fetchImagesFromCategory.fulfilled, (state, { payload }) => {
			const { list } = state.image;
	
			list.loading = false;
			imageAdapter.setAll(list.items, payload.items.map(
				(item) => ({
					id: item.id,
					type: item.type,
					categoryId: item.categoryId,
					createdAt: item.createdAt,
				}))
			);
		});

		builder.addCase(fetchImagesFromCategory.rejected, (state) => {
			const { image } = state;

			image.list = {
				...image.list,
				error: true,
				loading: false,
			}
		});

		builder.addCase(fetchImage.pending, (state) => {
			const { image } = state;

			image.selection = {
				...image.selection,
				item: null,
				loading: true,
			};
		});

		builder.addCase(fetchImage.fulfilled, (state, { payload }) => {
			const { image } = state;

			image.selection = {
				...image.selection,
				loading: false,
				item: {
					id: payload.id,
					exif: payload.exif
						? {
							iso: payload.exif.iso,
							shutterSpeed: payload.exif.shutterSpeed,
							focalLength: payload.exif.focalLength,
							aperture: payload.exif.aperture,
						}
						: undefined,
				}
			};
		});

		builder.addCase(fetchImagesPaginated.pending, (state, { meta }) => {
			const { image } = state;

			image.list.loading = true;
			
			if (meta.arg.offset === 0) {
				imageAdapter.removeAll(image.list.items);
			}
		});

		builder.addCase(fetchImagesPaginated.fulfilled, (state, { payload }) => {
			/**
			 * For now, it only handles the pagination with all categories. Since the selected
			 * category is not in the state yet, if an image is uploaded to a category that is not dispayed,
			 * it will still add it to the list.
			 */

			const { image } = state;
			const { result, resetList } = payload;
			const { offset: currentOffset, total, limit } = result;
			const { edition } = image;

			// Invalid pagination, maybe should throw an error
			if (currentOffset > total || currentOffset < 0) {
				return;
			}

			const previousOffset = Math.max(currentOffset - limit, 0);
			const nextOffset = currentOffset + limit;

			const hasNext = nextOffset < total;
			const hasPrevious = currentOffset !== 0;

			image.list = {
				...image.list,
				loading: false,
				total,
				hasNext,
				nextOffset,
				hasPrevious,
				previousOffset,
			};

			edition.statuses = reduceImageStatuses(edition.statuses, result.items);

			const newImageItems = result.items.map((img) => ({
				id: img.id,
				type: img.type,
				createdAt: img.createdAt,
				categoryId: img.categoryId,
			}));

			const action = resetList
				? 'setAll' as const
				: 'upsertMany' as const;

			imageAdapter[action](image.list.items, newImageItems)
		});

		builder.addCase(uploadImages.pending, (state) => {
			const { image } = state;
			
			image.edition.upload.loading = true;
			image.edition.upload.error = false;
		});

		builder.addCase(uploadImages.fulfilled, (state, { payload, meta }) => {
			const { image } = state;
			const { edition, list } = image;
			const { items: imageItems } = list;

			const uploadedItems = payload.items
				.map((image): ImageItem => {
					return {
						id: image.id,
						type: 'unknown',
						createdAt: image.createdAt,
						categoryId: meta.arg.categoryId,
					}
				});

			/**
			 * Only add them to the list if we are on the first page. Otherwise,
			 * it breaks the pagination (e.g. if our current offset is 5 and limit
			 * is 20, we'll have 15 identical images in the previous page).
			 */
			if (!list.hasPrevious) {
				/**
				 * If we have a next pages, we remote the number of items uploaded
				 * from the list so the pagination is still valid. Otherwise, if there
				 * is not pagination to break since we are on the first page and there is no
				 * second page.
				 */
				const numberItemsToRemove = list.hasNext
					? uploadImages.length
					: 0;
				
				if (numberItemsToRemove > 0) {
					imageAdapter.removeMany(
						imageItems,
						imageItems.ids.slice(
							imageItems.ids.length - numberItemsToRemove,
							imageItems.ids.length
						),
					);
				}
				imageAdapter.upsertMany(imageItems, uploadedItems);
			} else {
				/**
				 * Update the offset to keep the pagination up to date. It might result
				 * in the first pages with some identical images.
				 */
				list.nextOffset = list.nextOffset + uploadImages.length;
				list.previousOffset = list.previousOffset + uploadImages.length;
			}

			list.total = (list.total || 0) + uploadImages.length;

			edition.upload.loading = false;
			edition.statuses = reduceImageStatuses(edition.statuses, payload.items);
		});

		builder.addCase(uploadImages.rejected, (state) => {
			const { image } = state;

			image.edition.upload.error = true;
			image.edition.upload.loading = false;
		});

		builder.addCase(deleteImage.fulfilled, (state, { payload: { id } }) => {
			const { image } = state;
			const { [id]: deletedImage, ...otherStatuses } = image.edition.statuses;

			imageAdapter.removeOne(image.list.items, id);
			image.edition.statuses = otherStatuses;
			image.list.nextOffset = Math.max(
				image.list.nextOffset - 1,
				image.list.nextOffset,
			);
		});

		builder.addCase(setCategoryThumbnail.fulfilled, (state, { meta }) => {
			const { category } = state;

			categoryAdapter.updateOne(category.list.items, {
				id: meta.arg.categoryId,
				changes: {
					thumbnailId: meta.arg.thumbnailId,
				},
			});
		})
	}
});

export const { reducer, actions } = gallerySlice;
