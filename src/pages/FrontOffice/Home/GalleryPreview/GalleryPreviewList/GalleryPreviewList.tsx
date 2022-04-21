import React, { FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { getImageUrl } from 'libs/image/get-image-url';

import { GalleryButton } from 'components/UI/Button';

import styles from './GalleryPreviewList.module.css';

export type GalleryPreviewListProps = {
    thumbnails: ReadonlyArray<{
		imageId: string,
		categoryId: string,
		galleryName: string,
		categoryName: string,
	}>,
};

export const GalleryPreviewList: FunctionComponent<GalleryPreviewListProps> = ({ thumbnails }) => {
	const navigate = useNavigate();

	// TODO: Maybe move that to the api response
	const getThumbnailUrl = useCallback((imageId: string) => getImageUrl(imageId, {
		size: 'medium',
		thumbnail: true,
	}), []);

	const navigateToGalleryPage = useCallback((category: string) => () => {
		navigate('/gallery/' + category);
	}, [navigate]);

    return (
        <div className={styles.listContainer}>
            {thumbnails.map(({ imageId, categoryId, galleryName, categoryName }) => {
                return (
                    <div key={categoryId} className={styles.buttonContainer}>
                        <GalleryButton 
                            src={getThumbnailUrl(imageId)}
                            imageId={imageId}
                            onClick={navigateToGalleryPage(categoryId)}
                            categoryDisplayName={galleryName}    
                        />
                    </div>
                )
            })}
        </div>
    );
};
