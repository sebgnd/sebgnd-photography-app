import { FunctionComponent } from 'react';

import { BaseButtonContainer } from 'components/UI/Button';
import { ImageFade } from 'components/UI/Image/ImageFade/ImageFade';

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
			<BaseButtonContainer onClick={handleClick}>
				<div className={styles.imageContainer}>
					<ImageFade className={styles.image} src={src} alt={imageId}/>
				</div>
			</BaseButtonContainer>
		</div>
	);
}
