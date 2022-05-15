import React, { FunctionComponent } from 'react';

import { Text } from 'components/Styled/text';
import { ImageFade } from 'components/UI/Image';

import styles from './ViewerImage.module.css';

type ViewerImageProp = {
	src: string;
	imageId: string;
	imageInfo: string;
}

export const ViewerImage: FunctionComponent<ViewerImageProp> = ({ imageInfo, imageId, src }) => {
	return (
		<div className={styles.viewerImageContainer}>
			<div className={styles.viewerImageWrapper}>
				<ImageFade 
					className={styles.image} 
					src={src} 
					alt={imageId} 
					transitionTime={.15} 
				/>
				<div className={styles.imageInfo}>
					<Text size="medium" color="black" weight="normal">{imageInfo}</Text>
				</div>
			</div>
		</div>
	);
};
