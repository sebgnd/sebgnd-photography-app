import { FunctionComponent, useMemo } from 'react';

import { Text } from 'components/UI/Content/Text/Text';
import { Button } from 'components/UI/Button';
import { ImageFade } from 'components/UI/Image';

import { AdaptedImage } from './AdaptedImage';

import styles from './RecentImage.module.scss';

export type RecentImageType = 'portrait' | 'landscape';
export type RecentImageProp = {
	date: string;
	src: string;
	imageType: RecentImageType;
	imageId: string;
	categoryId: string;
	categoryDisplayName: string;
	onImageClick: (imageId: string) => void;
	onGalleryClick: (categoryId: string) => void;
}

export const RecentImage: FunctionComponent<RecentImageProp> = ({ 
	src, 
	date, 
	imageType, 
	imageId, 
	categoryId, 
	categoryDisplayName, 
	onImageClick, 
	onGalleryClick 
}) => {
	const isPortrait = imageType === 'portrait';

	const dateString = useMemo(() => {
		return new Date(date).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}, [date]);
    
	return (
		<div className={styles.recentImageContainer}>
			<div className={styles.info}>
				<div className={styles.infoContainer}>
					<div className={styles.galleryName}>
						<Button variant="light" onClick={() => onGalleryClick(categoryId)} label={categoryDisplayName} />
					</div>
				</div>

				<div className={styles.infoContainer}>
					<div className={styles.date}>
						<Text size="regular" text={dateString} />
					</div>
				</div>
			</div>
			
			<button
				className={styles.imageContainer}
				onClick={() => onImageClick(imageId)}
			>
				{isPortrait && (
						<ImageFade className={styles.fillerImage} src={src} alt={imageId} />
					)}
					<AdaptedImage type={imageType} src={src} alt={imageId} />
				</button>
		</div>
	);
}
