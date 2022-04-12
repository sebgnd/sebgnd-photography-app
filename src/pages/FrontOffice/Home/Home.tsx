import React, { Fragment, FunctionComponent, useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
	selectFirstThreeCategory,
	selectIsCategoryListLoading,
} from 'redux/slices/category/category.selector';

import { Parallax } from '../../../components/UI/Parallax/Parallax';

import Landing from './Landing/Landing';
import GalleriesPreview from './GalleryPreview/GalleryPreview';
import About from './About/About';


export const Home: FunctionComponent = () => {
	const categories = useSelector(selectFirstThreeCategory);
	const loading = useSelector(selectIsCategoryListLoading);

	const thumbnails = useMemo(() => {
		return categories.map((category) => {
			return {
				imageId: category.thumbnailId,
				galleryName: category.displayName,
				categoryId: category.id,
				categoryName: category.name,
			};
		});
	}, [categories]);

    return (
        <Fragment>
            <Parallax img="images/parallax-1.jpg" speed={0.5}>
                <Landing />
            </Parallax>
            <GalleriesPreview 
                loading={loading}
                thumbnails={thumbnails} 
            />
            <Parallax img="images/parallax-2.jpg" speed={0.5} >
                <About />
            </Parallax>
        </Fragment>
    )
};
