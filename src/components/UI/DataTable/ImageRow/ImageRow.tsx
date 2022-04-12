import React, { FunctionComponent } from 'react';

import styles from './ImageRow.module.css';

interface ImageRowProps {
    imgUrl: string;
    imgId: number;
    imgUploadDate: string;
    categoryName: string;
}

const ImageRow: FunctionComponent<ImageRowProps> = ({
    imgId,
    imgUrl,
    imgUploadDate,
    categoryName
}) => {
    return (
        <div className={styles.imageRow}>
            <div className={styles.imageRowCol}>
                <img src={imgUrl} alt={imgId.toString()}/>
            </div>
            <div className={styles.imageRowCol}>
                <p>{imgId}</p>
            </div>
            <div className={styles.imageRowCol}>
                <p>{categoryName}</p>
            </div>
            <div className={styles.imageRowCol}>
                <p>{imgUploadDate}</p>
            </div>
        </div>
    )
}

export default ImageRow;