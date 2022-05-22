import React, { FunctionComponent, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getImageUrl } from 'libs/image/get-image-url';

import {
	selectFirstThreeCategory,
	selectIsCategoryListFailed,
	selectIsCategoryListLoading,
} from 'redux/slices/gallery/gallery.selector';

import { Parallax } from 'components/UI/Parallax/Parallax';
import { Button, GalleryButton } from 'components/UI/Button';
import { Text } from 'components/UI/Content/Text/Text';
import { Spinner } from 'components/UI/Spinner/Spinner';
import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';

import styles from './Home.module.scss';

export const getThumbnailUrl = (imageId: string) => getImageUrl(imageId, {
	size: 'medium',
	thumbnail: true,
});

export const Home: FunctionComponent = () => {
	const categories = useSelector(selectFirstThreeCategory);
	const loading = useSelector(selectIsCategoryListLoading);
	const error = useSelector(selectIsCategoryListFailed);

	const navigate = useNavigate();

	const navigateToGalleryPage = useCallback((category: string) => () => {
		navigate('/gallery/' + category);
	}, [navigate]);

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
			<>
				<Parallax img="images/parallax-1.jpg" speed={0.5}>
					<div className={styles.landingContainer}>
						<div className={styles.landingButtonContainer}>
							<Button variant="classic" label="See this photo" onClick={() => {}} />
						</div>
					</div>
				</Parallax>
				<div className={styles.galleriesPreviewContainer}>
					<div className={styles.row}>
						<div className={styles.titleContainer}>
							<Text bold type="h1" size="2x-large" text="Galleries" />
						</div>
					</div>
					<div className={styles.row}>
						{loading && (
							<Spinner centerHorizontal />
						)}
						{error && (
							<InformationMessage
								message="Something went wrong"
								messageType="error"
								centerHorizontal
							/>
						)}
						{(!error && !loading) && (
							<div className={styles.listContainer}>
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
							</div>
						)}
					</div>
					<div className={styles.row}>
						<div className={styles.seeAllGalleriesButton}>
							<Button variant="classic" onClick={() => {}} label="See all galleries" />
						</div>
					</div>
				</div>
			</>
    );
};
