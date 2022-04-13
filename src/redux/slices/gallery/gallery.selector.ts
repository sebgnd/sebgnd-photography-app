import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'redux/store';

import { categoryAdapter } from './gallery.slice';

const categorySelectors = categoryAdapter.getSelectors<RootState>(
	({ gallery }) => gallery.category.list.items
);

export const selectCategoryList = categorySelectors.selectAll;
export const selectFirstThreeCategory = createSelector(
	selectCategoryList,
	(categories) => {
		return categories.slice(0, 3);
	}
)
export const selectIsCategoryListLoading = ({ gallery }: RootState) => gallery.category.list.loading;