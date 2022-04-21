import React, { FunctionComponent, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getImageUrl } from 'libs/image/get-image-url';

import { GalleryButton } from 'components/UI/Button';
import { Spinner } from 'components/UI/Spinner/Spinner';
import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';

import {
	selectCategoryList,
	selectIsCategoryListFailed,
	selectIsCategoryListLoading,
} from 'redux/slices/gallery/gallery.selector';

import styles from './Galleries.module.css';

// TODO: Maybe move that to the api response
export const getThumbnailUrl = (imageId: string) => getImageUrl(imageId, {
	size: 'medium',
	thumbnail: true,
});

export const Galleries: FunctionComponent = () => {
	const navigate = useNavigate();

    const categories = useSelector(selectCategoryList);
	const loading = useSelector(selectIsCategoryListLoading);
	const error = useSelector(selectIsCategoryListFailed);

	const navigateToGalleryPage = useCallback((category: string) => () => {
		navigate('/gallery/' + category);
	}, [navigate]);

    const thumbnails = useMemo(() => {
		return categories.map((category) => ({
			imageId: category.thumbnailId,
			galleryName: category.displayName,
			categoryId: category.id,
			categoryName: category.name,
		}));
	}, [categories]);

    return (
        <div className={styles.listContainer}>
            {(loading) && (
                <Spinner centerHorizontal centerVertical fullScreen />
            )}
			{(error) && (
				<InformationMessage
					message="Something went wrong"
					messageType="error"
					centerHorizontal
					centerVertical
					fullScreen
				/>
			)}
			{(!loading && !error) && (
				 <>
					{thumbnails.map(({ imageId, categoryId, galleryName }) => {
						return (
							<div key={categoryId} className={styles.galleryButtonContainer}>
								<GalleryButton
									src={getThumbnailUrl(imageId)}
									imageId={imageId}
									onClick={navigateToGalleryPage(categoryId)}
									categoryDisplayName={galleryName}   
								/>
							</div>
						)
					})}
			 	</>
			)}
        </div>
    )
}
