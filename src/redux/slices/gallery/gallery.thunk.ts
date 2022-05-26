import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	FetchAllCategoriesResponse,
	FetchImageResponse,
	FetchImagesFromCategoryResponse,
	FetchImagesPaginatedPayload,
	FetchImagesPaginatedResponse,
	UploadImagesPayload,
	UploadImagesResponse
} from './gallery.types';

export const fetchAllCategories = createAsyncThunk<FetchAllCategoriesResponse>(
	'gallery/fetchAllCategories',
	async () => {
		const response = await fetch('http://localhost:8000/api/categories', {
			method: 'GET',
		});

		return response.json();
	}
);

export const fetchImagesFromCategory = createAsyncThunk<FetchImagesFromCategoryResponse, string>(
	'gallery/fetchImagesFromCategory',
	async (id: string) => {
		const response = await fetch(`http://localhost:8000/api/categories/${id}/images`, {
			method: 'GET',
		});

		return response.json();
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

		const response = await fetch(`http://localhost:8000/api/images?${queryParams.toString()}`, {
			method: 'GET',
		});

		return {
			result: await response.json(),
			resetList,
		};
	}
);

export const fetchImage = createAsyncThunk<FetchImageResponse, string>(
	'gallery/fetchImage',
	async (id: string) => {
		const response = await fetch(`http://localhost:8000/api/images/${id}`, {
			method: 'GET',
		});

		return response.json();
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

				const response = await fetch('http://localhost:8000/api/images', {
					method: 'POST',
					body: formData,
				});

				return response.json();
			})
		);

		// To have the same return value as the previous request response type
		return {
			items: responses.map((response) => response.item),
		}
	}
)