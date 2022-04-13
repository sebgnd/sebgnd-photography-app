import { createAsyncThunk } from '@reduxjs/toolkit';

import { FetchAllCategoriesResponse } from './gallery.types';

export const fetchAllCategories = createAsyncThunk<FetchAllCategoriesResponse>(
	'gallery/fetchAllCategories',
	async () => {
		const response = await fetch('http://localhost:8000/api/categories', {
			method: 'GET',
		});

		return response.json();
	}
)