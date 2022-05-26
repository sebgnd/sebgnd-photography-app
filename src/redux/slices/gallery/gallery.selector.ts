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
export const selectCategoryById = categorySelectors.selectById;
export const selectCategoryMap = categorySelectors.selectEntities;
export const selectImageList = imageSelectors.selectAll;

export const selectFirstThreeCategory = createSelector(
	selectCategoryList,
	(categories) => {
		return categories.slice(0, 3);
	}
)
export const selectIsCategoryListLoading = ({ gallery }: RootState) => gallery.category.list.loading;
export const selectIsCategoryListFailed = ({ gallery }: RootState) => gallery.category.list.error;

export const selectIsImageListLoading = ({ gallery }: RootState) => gallery.image.list.loading;
export const selectSelectedImage = ({ gallery }: RootState) => gallery.image.selection.item;
export const selectTotalImageList = ({ gallery }: RootState) => gallery.image.list.total;
export const selectIsImageListFailed = ({ gallery }: RootState) => gallery.image.list.error;

export const selectPaginationNextOffset = ({ gallery }: RootState) => gallery.image.list.nextOffset;
export const selectPaginationPreviousOffset = ({ gallery }: RootState) => gallery.image.list.previousOffset;

export const selectHasNext = ({ gallery }: RootState) => gallery.image.list.hasNext;
export const selectHasPrevious = ({ gallery }: RootState) => gallery.image.list.hasPrevious;

export const selectIsImageUploadLoading = ({ gallery }: RootState) => gallery.image.edition.upload.loading;
export const selectIsImageUploadFailed = ({ gallery }: RootState) => gallery.image.edition.upload.error;
