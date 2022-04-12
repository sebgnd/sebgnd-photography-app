import React, { FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { GalleryButton } from 'components/UI/Button';
import Spinner from 'components/UI/Spinner/Spinner';

import styles from './GalleryList.module.css';

interface GalleriesListProps {
    thumbnails: ReadonlyArray<{
		imageId: string,
		categoryId: string,
		categoryName: string,
		galleryName: string,
	}>,
    loading: boolean;
}

const GalleriesList: FunctionComponent<GalleriesListProps> = ({ thumbnails, loading }) => {
	const navigate = useNavigate();

	// TODO: Move that to a server or computed by API
	const getThumbnailUrl = useCallback((imageId: string) => {
		return `http://localhost:8000/api/file/images/thumbnail/400/${imageId}`;
	}, []);
	
	const navigateToGalleryPage = useCallback((category: string) => () => {
		navigate('/gallery/' + category);
	}, [navigate]);

    return (
        <div className={styles.listContainer}>
            {(loading) ? (
                <Spinner centerHorizontal centerVertical fullScreen />
            ) : (
                <>
					{thumbnails.map(({ imageId, categoryId, galleryName, categoryName }) => {
						return (
							<div key={categoryId} className={styles.galleryButtonContainer}>
								<GalleryButton
									src={getThumbnailUrl(imageId)}
									imageId={imageId}
									onClick={navigateToGalleryPage(categoryName)}
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

export default GalleriesList;