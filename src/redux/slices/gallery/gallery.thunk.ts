import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	FetchAllCategoriesResponse,
	FetchImageResponse,
	FetchImagesFromCategoryResponse,
	FetchImagesPaginatedResponse
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
)

export const fetchImagesPaginated = createAsyncThunk<FetchImagesPaginatedResponse, { limit: number, offset: number }>(
	'gallery/fetchImagesPaginated',
	async ({ limit, offset }) => {
		const response = await fetch(`http://localhost:8000/api/images?limit=${limit}&offset=${offset}`, {
			method: 'GET',
		});

		return response.json();
	}
)

export const fetchImage = createAsyncThunk<FetchImageResponse, string>(
	'gallery/fetchImage',
	async (id: string) => {
		const response = await fetch(`http://localhost:8000/api/images/${id}`, {
			method: 'GET',
		});

		return response.json();
	}
)