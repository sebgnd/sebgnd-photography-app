import React, { FunctionComponent, MouseEvent } from 'react';

import { Text } from 'components/Styled/text';
import { Button } from 'components/UI/Button';
import { ImageFade } from 'components/UI/Image';
import { ButtonContainerWidthWidth } from 'components/Styled/container';

import { AdaptedImage } from './AdaptedImage';

import styles from './RecentImage.module.css';

export type RecentImageType = 'portrait' | 'landscape';
export type RecentImageProp = {
    date: string;
    src: string;
    imageType: RecentImageType;
    imageId: string;
    categoryId: string;
    categoryDisplayName: string;
    onImageClick: (event: MouseEvent, imageId: string) => void;
    onGalleryClick: (event: MouseEvent, categoryId: string) => void;
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
    
    return (
        <div className={styles.recentImageContainer}>
            <div className={styles.info}>
                <div className={styles.infoContainer}>
                    <div className={styles.galleryName}>
                        <Button variant="light" size="small" onClick={(event) => onGalleryClick(event, categoryId)} label={categoryDisplayName} />
                    </div>
                </div>

                <div className={styles.infoContainer}>
                    <div className={styles.date}>
                        <Text size="small" color="#7E7E7E" weight="bold">{date}</Text>
                    </div>
                </div>
            </div>
            
            <div className={styles.imageContainer}>
                <ButtonContainerWidthWidth width="100%" onClick={(event) => onImageClick(event, imageId)}>
                    { isPortrait && (
                        <ImageFade className={styles.fillerImage} src={src} alt={imageId} />
                    )}
                    <AdaptedImage type={imageType} src={src} alt={imageId} />
                </ButtonContainerWidthWidth>
            </div>
        </div>
    )
}
