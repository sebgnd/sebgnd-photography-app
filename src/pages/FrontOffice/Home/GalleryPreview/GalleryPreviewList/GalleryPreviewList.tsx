import React, { FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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

	// TODO: Move that to a server or computed by API
	const getThumbnailUrl = (imageId: string) => {
		return `http://localhost:8000/api/file/images/thumbnail/400/${imageId}`;
	};

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
                            onClick={navigateToGalleryPage(categoryName)}
                            categoryDisplayName={galleryName}    
                        />
                    </div>
                )
            })}
        </div>
    );
};
