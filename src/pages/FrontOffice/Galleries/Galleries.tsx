import React, { FunctionComponent, useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
	selectCategoryList,
	selectIsCategoryListLoading,
} from 'redux/slices/category/category.selector';

import GalleryList from './GalleryList/GalleryList';

export const Galleries: FunctionComponent = () => {
    const categories = useSelector(selectCategoryList);
	const loading = useSelector(selectIsCategoryListLoading);

    const thumbnails = useMemo(() => {
		return categories.map((category) => ({
			imageId: category.thumbnailId,
			galleryName: category.displayName,
			categoryId: category.id,
			categoryName: category.name,
		}));
	}, [categories]);

    return (
        <GalleryList loading={loading} thumbnails={thumbnails} />
    )
}
