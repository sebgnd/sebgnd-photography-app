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
import { Title, Text } from 'components/Styled/text';
import { Spinner } from 'components/UI/Spinner/Spinner';
import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';

import styles from './Home.module.css';

// TODO: Maybe move that to the api response
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
								<Title color="black">Galleries</Title>
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
									{thumbnails.map(({ imageId, categoryId, galleryName, categoryName }) => {
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
          <Parallax img="images/parallax-2.jpg" speed={0.5} >
						<div className={styles.aboutContainer}>
							<div className={styles.titleContainer}>
								<Title color="black">About me and my gear</Title>
							</div>
							<div className={styles.aboutContent}>
								<div className={`${styles.textContainer} ${styles.aboutMe}`}>
									<Text size="medium" color="black" weight="normal"> 
										My name is Sebastien Gnd and i am a French amateur photographer based in Limoges, France. 
										My passion for photography dates back to 2016 when I was in high school. My other passions 
										include technology, video games, cars, cinema … I am studying in Computer Science.
									</Text>
									<div className={styles.contactButtonContainer}>
										<Button variant="classic" onClick={() => {}} label="Contact me" />
									</div>
								</div>
								<div className={`${styles.textContainer} ${styles.gear}`}>
									<Text size="medium" color="black" weight="normal"> 
										- Canon 70D - Sigma 18-35 f1.8 <br />
										- Sigma 50-100 f1.8 <br />
										- Tokina 11-20 f2.8 <br />
										- Manfrotto BeFree tripod <br />
										- Lowepro Protactict 450 backpack <br />
										- Hoya ND1000 (72 - 82 mm) <br />
									</Text>
								</div>
							</div>
						</div>
        	</Parallax>
        </>
    );
};
