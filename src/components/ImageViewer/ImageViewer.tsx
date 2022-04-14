import React, { FunctionComponent, useMemo } from 'react';

import { getImageUrl } from 'libs/image/get-image-url';

import { ViewerImage } from 'components/UI/Image';
import { Backdrop } from 'components/UI/Backdrop/Backdrop';

import styles from './ImageViewer.module.css';

export type ImageViewerProps = {
    onBackdropClick: () => void,
    imageId: string,
    exif?: {
        iso: number,
    },
};

export const ImageViewer: FunctionComponent<ImageViewerProps> = ({ imageId, exif, onBackdropClick }) => {
   const imageUrl = getImageUrl(imageId, {
        size: 'full',
        thumbnail: false,
   });

   const imageInfo = useMemo(() => {
    if (!exif) {
        return 'No image information.'
    }

    const { iso } = exif;

    return `ISO: ${iso}`;
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
 