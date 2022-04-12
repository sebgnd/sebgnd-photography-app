import { createAsyncThunk } from '@reduxjs/toolkit';

import { FetchAllCategoriesResponse } from './category.types';

export const fetchAllCategories = createAsyncThunk<FetchAllCategoriesResponse>(
	'category/fetchAllCategories',
	async () => {
		const response = await fetch('http://localhost:8000/api/categories', {
			method: 'GET',
		});

		return response.json();
	}
)