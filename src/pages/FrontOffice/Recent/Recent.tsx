import React, { FunctionComponent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getImageUrl } from 'libs/image/get-image-url';

import { useEndPageReached } from 'hooks/useEndPageReached';

import { RecentImage } from 'components/UI/Image';
import { Spinner } from 'components/UI/Spinner/Spinner';

import { actions } from 'redux/slices/gallery/gallery.slice';
import { selectImageList, selectIsImageListLoading, selectTotalImageList } from 'redux/slices/gallery/gallery.selector';
import { fetchImagesPaginated } from 'redux/slices/gallery/gallery.thunk';

import styles from './Recent.module.css';

export const Recent: FunctionComponent = () => {
    const dispatch = useDispatch();

	const canLoad = useRef(true);

    const loading = useSelector(selectIsImageListLoading);
    const images = useSelector(selectImageList);
    const total = useSelector(selectTotalImageList);

    const reached = useEndPageReached();

    useEffect(() => {
        if (images.length === total) {
            return;
        }

        if (reached && !loading && canLoad.current || (images.length === 0 && !loading)) {
            dispatch(fetchImagesPaginated({
                limit: 10,
                offset: images.length,
            }));

			canLoad.current = false
        }
    }, [dispatch, images, total, reached, loading, canLoad]);

    useEffect(() => {
        dispatch(actions.clearImageList());
    }, [dispatch]);

	useEffect(() => {
		if (!loading) {
			/**
			 * Delay to let reached be updated while the images are rendered. Once the images
			 * are feched, there is a small time when loading is false and reached is still true which
			 * causes another batch of images to be feched.
			 */
			setTimeout(() => {
				canLoad.current = true;
			}, [250])
		}
	}, [loading]);

    return (
        <div className={styles.imageListContainer}>
            {images.map((img) => (
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
					// TODO: Implament clicks
                    onImageClick={() => {}}
                    onGalleryClick={() => {}}
                    imageType={img.type}
                />
            ))}
			{loading && (
				<div className={styles.spinnerContainer}>
					<Spinner centerHorizontal />
				</div>
			)}
        </div>
    );
};
