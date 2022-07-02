import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from 'libs/http/request';

import {
	DeleteImagePayload,
	DeleteImageResponse,
	FetchAllCategoriesResponse,
	FetchImageResponse,
	FetchImagesFromCategoryResponse,
	FetchImagesPaginatedPayload,
	FetchImagesPaginatedResponse,
	UploadImagesPayload,
	UploadImagesResponse,
	SetCategoryThumbnailPayload
} from './gallery.types';

export const fetchAllCategories = createAsyncThunk<FetchAllCategoriesResponse>(
	'gallery/fetchAllCategories',
	async () => {
		const response = await request('categories', {
			method: 'GET',
		});

		return response.data;
	}
);

export const fetchImagesFromCategory = createAsyncThunk<FetchImagesFromCategoryResponse, string>(
	'gallery/fetchImagesFromCategory',
	async (id: string) => {
		const response = await request(`categories/${id}/images`, {
			method: 'GET',
		});

		return response.data;
	}
);

export const fetchImagesPaginated = createAsyncThunk<FetchImagesPaginatedResponse, FetchImagesPaginatedPayload>(
	'gallery/fetchImagesPaginated',
	async ({ limit, offset, resetList, categoryId, status }) => {
		const queryParams = new URLSearchParams({
			limit: limit.toString(),
			offset: offset.toString(),
			status,
			...(categoryId ? { category: categoryId } : {}),
		});

		const response = await request(`images?${queryParams.toString()}`, {
			method: 'GET',
		});

		return {
			result: response.data,
			resetList,
		};
	}
);

export const fetchImage = createAsyncThunk<FetchImageResponse, string>(
	'gallery/fetchImage',
	async (id: string) => {
		const response = await request(`images/${id}`, {
			method: 'GET',
		});

		return response.data;
	}
);

export const uploadImages = createAsyncThunk<UploadImagesResponse, UploadImagesPayload>(
	'gallery/uploadImages',
	async ({ files, categoryId }) => {
		const responses = await Promise.all(
			files.map(async (file) => {
				const formData = new FormData();

				formData.append('categoryId', categoryId);
				formData.append('image', file);

				const response = await request('images', {
					method: 'POST',
					body: formData,
				});

				return response.data;
			})
		);

		// To have the same return value as the previous request response type
		return {
			items: responses.map((response) => response.item),
		}
	}
);

export const deleteImage = createAsyncThunk<DeleteImageResponse, DeleteImagePayload>(
	'gallery/deleteImage',
	async ({ id }) => {
		const response = await request(`http://localhost:8000/api/images/${id}`, {
			method: 'DELETE',
		});

		return response.data;
	}
)

export const setCategoryThumbnail = createAsyncThunk<void, SetCategoryThumbnailPayload>(
	'gallery/setCategoryThumbnail',
	async ({ categoryId, thumbnailId }) => {
		await request(`categories/${categoryId}/thumbnail`, {
			method: 'PUT',
			body: {
				imageId: thumbnailId,
			},
		});
	}
)