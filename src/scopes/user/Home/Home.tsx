import { FunctionComponent, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getImageUrlOrUndefined } from 'libs/image/get-image-url';

import {
	selectFirstThreeCategory,
	selectIsCategoryListFailed,
	selectIsCategoryListLoading,
} from 'redux/slices/gallery/gallery.selector';

import { Centered } from 'hoc/Centered/Centered';

import { Parallax } from 'components/UI/Parallax/Parallax';
import { Button, GalleryButton } from 'components/UI/Button';
import { Text } from 'components/UI/Content/Text/Text';
import { Spinner } from 'components/UI/Spinner/Spinner';
import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';

import styles from './Home.module.scss';

export const getThumbnailUrl = (imageId: string | null) => getImageUrlOrUndefined(imageId, {
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

	const navigationToGalleriesPage = useCallback(() => {
		navigate('/galleries');
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
					<div className={styles.landingContainer} />
				</Parallax>
				<div className={styles.galleriesPreviewContainer}>
					<div className={styles.row}>
						<div className={styles.titleContainer}>
							<Text bold type="h1" size="2x-large" text="Galleries" />
						</div>
					</div>
					<div className={styles.row}>
						{loading && (
							<Centered centerHorizontal>
								<Spinner />
							</Centered>
						)}
						{error && (
							<Centered centerHorizontal>
								<InformationMessage
									message="Something went wrong"
									messageType="error"
								/>
							</Centered>
						)}
						{(!error && !loading) && (
							<div className={styles.listContainer}>
								{thumbnails.map(({ imageId, categoryId, galleryName }) => {
									return (
										<div key={categoryId} className={styles.galleryButtonContainer}>
											<GalleryButton 
												src={getThumbnailUrl(imageId)}
												imageId={imageId || undefined}
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
							<Button variant="classic" onClick={navigationToGalleriesPage} label="See all galleries" />
						</div>
					</div>
				</div>
			</>
    );
};
