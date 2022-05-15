import React, { FunctionComponent } from 'react';

import { Text } from 'components/Styled/text';
import { ButtonContainer } from 'components/Styled/container';
import { ImageFade } from 'components/UI/Image/ImageFade/ImageFade';

import styles from './GalleryButton.module.css';

export type GalleryButtonProp = {
	src: string;
	imageId: string;
	onClick: () => void;
	categoryDisplayName: string;
}

export const GalleryButton: FunctionComponent<GalleryButtonProp> = ({ src, imageId, onClick, categoryDisplayName }) => {
	return (
		<div className={styles.galleryButtonContainer}>
			<div className={styles.galleryButtonWrapper}>
				<ButtonContainer onClick={() => onClick()}>
					<div className={styles.galleryImage}>
						<ImageFade
							className={styles.image}
							src={src}
							alt={imageId}
						/>
					</div>

					<div id="gallery-name" className={styles.galleryName}>
						<Text size="medium" color="black" weight="normal">{categoryDisplayName}</Text>
					</div>
				</ButtonContainer>
			</div>
		</div>
	);
};
