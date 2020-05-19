import React, { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Button } from '../UI/Button';
import GalleryPreviewList from './GalleryPreviewList/GalleryPreviewList';
import { Title } from '../Styled/text';

import styles from './GalleryPreview.module.css';

import Category from '../../helper/category/Category';
import Paths from '../../helper/Paths';

interface GalleriesPreviewProps extends RouteComponentProps {
    categories: Category[];
}

const GalleriesPreview: FunctionComponent<GalleriesPreviewProps> = (props) => {
    const goToGalleries = () => {
        props.history.push(Paths.gallery());
    }

    return (
        <div className={styles.galleriesPreviewContainer}>
            <div className={styles.row}>
                <div className={styles.titleContainer}>
                    <Title color="black">Galleries</Title>
                </div>
            </div>
            <div className={styles.row}>
                <GalleryPreviewList categories={props.categories} />
            </div>
            <div className={styles.row}>
                <div className={styles.buttonContainer}>
                    <Button size="medium" variant="classic" onClick={goToGalleries}>See all galleries</Button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(GalleriesPreview);