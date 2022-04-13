import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	FetchAllCategoriesResponse,
	FetchImagesFromCategoryResponse
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