import { EntityState, PayloadAction } from '@reduxjs/toolkit';

export type SetImageProcessedStatus = PayloadAction<{
	id: string,
	status: string,
}>;

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
		type: 'landscape' | 'portrait',
		categoryId: string,
		createdAt: string,
		updatedAt: string,
	}>
}

export type FetchImageResponse = {
	id: string,
	createdAt: string,
	updatedAt: string,
	exif: null | {
		iso: number,
		shutterSpeed: number,
		focalLength: number,
		aperture: number,
	}
}

export type FetchImagesPaginatedResponse = {
	result: {
		items: ReadonlyArray<{
			id: string,
			categoryId: string,
			createdAt: string,
			updatedAt: string,
			status: string,
			type: 'landscape' | 'portrait',
		}>
		total: number,
		limit: number,
		offset: number,
	},
	resetList: boolean,
};

export type FetchImagesPaginatedPayload = {
	limit: number,
	offset: number,
	resetList: boolean,
	categoryId?: string,
	status: string,
};

export type UploadImagesPayload = {
	files: File[],
	categoryId: string,
};

export type UploadImagesResponse = {
	items: ReadonlyArray<{
		id: string,
		status: string,
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
	type: 'landscape' | 'portrait',
	createdAt: string,
	categoryId: string,
}

export type SelectedImage = {
	id: string,
	exif?: {
		iso: number,
		shutterSpeed: number,
		aperture: number,
		focalLength: number,
	},
}

export type GalleryState = {
	category: {
		list: {
			items: EntityState<CategoryItem>,
			loading: boolean,
			error: boolean,
		},
		selectedCategoryName: string | null,
	},
	image: {
		list: {
			error: boolean,
			loading: boolean,
			hasNext: boolean,
			hasPrevious: boolean,
			total: number | null,
			nextOffset: number,
			previousOffset: number,
			items: EntityState<ImageItem>,
		},
		edition: {
			upload: {
				loading: boolean,
				error: boolean,
			},
			statuses: Record<string, string>,
		}
		selection: {
			item: SelectedImage | null,
			loading: boolean,
		},
	},
};
