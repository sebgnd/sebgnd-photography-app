import { EntityState } from '@reduxjs/toolkit';

export type FetchAllCategoriesResponse = {
	items: ReadonlyArray<{
		id: string,
		createdAt: string,
		updatedAt: string,
		displayName: string,
		name: string,
		thumbnail: {
			id: string,
		},
	}>,
}

export type FetchImagesFromCategoryResponse = {
	items: ReadonlyArray<{
		id: string,
		categoryId: string,
		createdAt: string,
		updatedAt: string,
	}>
}

export type CategoryItem = {
	id: string,
	name: string,
	displayName: string,
	thumbnailId: string,
}

export type ImageItem = {
	id: string,
	createdAt: string,
	categoryId: string,
}

export type SelectedImage = {
	id: string,
	exif: {
		iso: number,
		shutterSpeed: string,
		aperture: string,
		focalLength: string,
	},
}

export type GalleryState = {
	category: {
		list: {
			items: EntityState<CategoryItem>,
			loading: boolean,
		},
		selectedCategoryName: string | null,
	},
	image: {
		list: {
			items: EntityState<ImageItem>,
			loading: boolean,
		},
		selection: {
			item: SelectedImage | null,
			loading: boolean,
		},
	},
};
