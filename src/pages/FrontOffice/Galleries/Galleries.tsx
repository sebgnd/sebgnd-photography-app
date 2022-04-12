import React, { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import GalleryList from './GalleryList/GalleryList';

import { selectAllCategoryThumbnails, selectCategoryStatus } from '../../../redux/selectors/category-selector';
import { fetchCategories } from '../../../redux/slices/category';
import { imagesEmptied } from '../../../redux/slices/image';

const Galleries: FunctionComponent = () => {
    const dispatch = useDispatch();
    const thumbnails = useSelector(selectAllCategoryThumbnails);
    const status = useSelector(selectCategoryStatus);

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(imagesEmptied());
    }, [dispatch]);

    return (
        <GalleryList status={status} thumbnails={thumbnails} />
    );
}

export default Galleries;