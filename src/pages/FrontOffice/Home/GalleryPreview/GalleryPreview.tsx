import React, { FunctionComponent } from 'react';

import { CategoryWithThumbnail } from '../../../../helper/category/Category';

import { Title } from '../../../../components/Styled/text';
import { Button } from '../../../../components/UI/Button';
import InformationMessage from '../../../../components/UI/InformationMessage/InformationMessage';
import Spinner from '../../../../components/UI/Spinner/Spinner';

import GalleryPreviewList from './GalleryPreviewList/GalleryPreviewList';

import styles from './GalleryPreview.module.css';

interface GalleriesPreviewProps {
    thumbnails: CategoryWithThumbnail[];
    status: string;
}

const GalleriesPreview: FunctionComponent<GalleriesPreviewProps> = ({ thumbnails, status }) => {
    return (
        <div className={styles.galleriesPreviewContainer}>
            <div className={styles.row}>
                <div className={styles.titleContainer}>
                    <Title color="black">Galleries</Title>
                </div>
            </div>
            <div className={styles.row}>
                {(status === 'loading') ? (
                    <Spinner centerHorizontal />
                ) : (
                    (status === 'failed') ? (
                        <InformationMessage centerHorizontal messageType="error" message="Couldn't load galleries" />
                    ) : (
                        <GalleryPreviewList thumbnails={thumbnails} />
                    )
                )}
            </div>
            <div className={styles.row}>
                <div className={styles.buttonContainer}>
                    <Button size="medium" variant="classic" to="/gallery" label="See all galleries" />
                </div>
            </div>
        </div>
    )
};

export default GalleriesPreview;