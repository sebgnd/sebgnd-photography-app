import { FunctionComponent, useMemo } from 'react';

import { getImageUrl } from 'libs/image/get-image-url';

import { ViewerImage } from 'components/UI/Image';
import { Backdrop } from 'components/UI/Backdrop/Backdrop';

import styles from './ImageViewer.module.css';

export type ImageViewerProps = {
	onBackdropClick: () => void,
	imageId: string,
	exif?: {
		iso: number,
		shutterSpeed: string,
		aperture: string,
		focalLength: string,
	},
};

export const ImageViewer: FunctionComponent<ImageViewerProps> = ({ imageId, exif, onBackdropClick }) => {
	const imageUrl = useMemo(() => getImageUrl(imageId, {
		size: 'full',
		thumbnail: false,
	}), [imageId]);

	const imageInfo = useMemo(() => {
		if (!exif) {
			return 'No image information.'
		}

		const { iso, shutterSpeed, aperture, focalLength } = exif;

		return `ISO ${iso}, ${shutterSpeed}, ${aperture}, ${focalLength}`;
	}, [exif])

	return (
		<div className={styles.imageViewerContainer}>
			<Backdrop zIndex={100} onClick={onBackdropClick} show={true} />
			<div className={styles.imageContainer}>
					<ViewerImage
						src={imageUrl}
						imageInfo={imageInfo}
						imageId={imageId}
					/>
			</div>
		</div>
	);
};
 