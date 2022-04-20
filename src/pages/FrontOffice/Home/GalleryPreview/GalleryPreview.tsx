import React, { FunctionComponent } from 'react';

import { Title } from 'components/Styled/text';
import { Button } from 'components/UI/Button';
import { Spinner } from 'components/UI/Spinner/Spinner';

import { GalleryPreviewList, GalleryPreviewListProps } from './GalleryPreviewList/GalleryPreviewList';

import styles from './GalleryPreview.module.css';
import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';

type GalleriesPreviewProps = {
    thumbnails: GalleryPreviewListProps['thumbnails'];
    loading: boolean;
	error: boolean;
}

export const GalleriesPreview: FunctionComponent<GalleriesPreviewProps> = ({ thumbnails, loading, error }) => {
    return (
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
					<GalleryPreviewList thumbnails={thumbnails} />
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
