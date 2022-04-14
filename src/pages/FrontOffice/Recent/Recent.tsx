import React, { FunctionComponent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getImageUrl } from 'libs/image/get-image-url';

import { useEndPageReached } from 'hooks/useEndPageReached';

import { FlexColumn, FlexContainer } from 'components/Styled/container';
import { RecentImage } from 'components/UI/Image';

import { actions } from 'redux/slices/gallery/gallery.slice';
import { selectImageList, selectIsImageListLoading, selectTotalImageList } from 'redux/slices/gallery/gallery.selector';
import { fetchImagesPaginated } from 'redux/slices/gallery/gallery.thunk';

import styles from './Recent.module.css';

export const Recent: FunctionComponent = () => {
    const dispatch = useDispatch();

    const loading = useSelector(selectIsImageListLoading);
    const images = useSelector(selectImageList);
    const total = useSelector(selectTotalImageList);

    const reached = useEndPageReached();

    useEffect(() => {
        if (images.length === total) {
            return;
        }

        if (reached && !loading || (images.length === 0 && !loading)) {
            dispatch(fetchImagesPaginated({
                limit: 10,
                offset: images.length,
            }));
        }
    }, [dispatch, images, total, reached, loading]);

    useEffect(() => {
        dispatch(actions.clearImageList());
    }, [dispatch]);

    useEffect(() => {
        console.log({ reached });
    }, [reached]);

    return (
        <div className={styles.imageListContainer}>
            {images.map((img) => (
                // TODO: Use real data
                <RecentImage
                    key={img.id}
                    date={img.createdAt}
                    src={getImageUrl(img.id, {
                        size: 'medium',
                        thumbnail: false,
                    })}
                    imageId={img.id}
                    categoryId={img.categoryId}
                    categoryDisplayName="Landscape"
                    onImageClick={() => {}}
                    onGalleryClick={() => {}}
                    imageType="landscape"
                />
            ))}
        </div>
    );
};
