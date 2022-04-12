import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'redux/store';

import { categoryAdapter } from './category.slice';

const categorySelectors = categoryAdapter.getSelectors<RootState>(
	(state) => state.category.list.items
);

export const selectCategoryList = categorySelectors.selectAll;
export const selectFirstThreeCategory = createSelector(
	selectCategoryList,
	(categories) => {
		return categories.slice(0, 3);
	}
)
export const selectIsCategoryListLoading = (state: RootState) => state.category.list.loading;