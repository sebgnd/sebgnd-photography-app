import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'redux/store';

import { categoryAdapter, imageAdapter } from './gallery.slice';

const categorySelectors = categoryAdapter.getSelectors<RootState>(
	({ gallery }) => gallery.category.list.items
);
const imageSelectors = imageAdapter.getSelectors<RootState>(
	({ gallery }) => gallery.image.list.items
)

export const selectCategoryList = categorySelectors.selectAll;
export const selectCategoryByName = categorySelectors.selectById;
export const selectImageList = imageSelectors.selectAll;

export const selectFirstThreeCategory = createSelector(
	selectCategoryList,
	(categories) => {
		return categories.slice(0, 3);
	}
)
export const selectIsCategoryListLoading = ({ gallery }: RootState) => gallery.category.list.loading;
export const selectIsImageListLoading = ({ gallery }: RootState) => gallery.image.list.loading;
