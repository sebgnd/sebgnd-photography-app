import React, { FunctionComponent } from 'react';

import { ButtonContainer } from '../../../Styled/container';
import { ImageFade } from '../ImageFade/ImageFade';

import styles from './SingleImage.module.css';

type SingleImageProp = {
	src: string;
	imageId: string;
	categoryId: string;
	onClick?: (imageId: string, categoryId: string) => void;
}

export const SingleImage: FunctionComponent<SingleImageProp> = ({ src, imageId, categoryId, onClick }) => {
	const handleClick = () => {
		if (onClick) {
			onClick(imageId, categoryId);
		}
	}

	return (
		<div className={styles.singleImageContainer}>
			<ButtonContainer onClick={handleClick}>
				<div className={styles.imageContainer}>
					<ImageFade className={styles.image} src={src} alt={imageId}/>
				</div>
			</ButtonContainer>
		</div>
	);
}
