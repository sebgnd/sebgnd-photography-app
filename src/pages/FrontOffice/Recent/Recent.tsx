import { FunctionComponent, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'redux/store';

import { getImageUrl } from 'libs/image/get-image-url';

import { useEndPageReached } from 'hooks';
import { useImageSelection, usePaginatedImageList } from 'hooks/gallery';

import { RecentImage } from 'components/UI/Image';
import { Spinner } from 'components/UI/Spinner/Spinner';
import { ImageViewer } from 'components/ImageViewer/ImageViewer';

import { Centered } from 'hoc/Centered/Centered';

import {
	selectImageList,
	selectCategoryMap,
	selectTotalImageList,
	selectIsImageListLoading,
} from 'redux/slices/gallery/gallery.selector';

import styles from './Recent.module.css';

export const Recent: FunctionComponent = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const canLoad = useRef(true);

	const { selectImage, resetSelection, selection } = useImageSelection();
	const { fetchNextPage } = usePaginatedImageList({
		limit: 10,
		status: 'valid',
	});

	const categoryMap = useSelector(selectCategoryMap);
	const loading = useSelector(selectIsImageListLoading);
	const images = useSelector(selectImageList);
	const total = useSelector(selectTotalImageList);

	const reached = useEndPageReached();

	const handleCategoryClick = useCallback((categoryId: string) => {
		navigate(`/gallery/${categoryId}`);
	}, [navigate]);

	useEffect(() => {
		if (images.length === total) {
			return;
		}

		const fetchIfBottomReached = reached && !loading && canLoad.current;
		const fetchIfFirstRender = images.length === 0 && !loading;

		if (fetchIfBottomReached || fetchIfFirstRender) {
			fetchNextPage();

			canLoad.current = false
		}
	}, [dispatch, fetchNextPage, images, total, reached, loading, canLoad]);

	useEffect(() => {
		if (!loading) {
			/**
			 * Delay to let reached be updated while the images are rendered. Once the images
			 * are feched, there is a small time when loading is false and reached is still true which
			 * causes another batch of images to be feched.
			 */
			const timeoutId = setTimeout(() => {
				canLoad.current = true;
			}, 250);

			return () => clearTimeout(timeoutId);
		}

		return () => {};
	}, [loading]);

	return (
		<div className={styles.imageListContainer}>
			{images.map((img) => (
				img.type === 'unknown'
					? null
					: (
						<RecentImage
							key={img.id}
							date={img.createdAt}
							src={getImageUrl(img.id, {
								size: 'medium',
								thumbnail: false,
							})}
							imageId={img.id}
							categoryId={img.categoryId}
							categoryDisplayName={categoryMap[img.categoryId]?.displayName || "Unknown"}
							onImageClick={selectImage}
							onGalleryClick={handleCategoryClick}
							imageType={img.type}
						/>
					)
			))}
			{loading && (
				<div className={styles.spinnerContainer}>
					<Centered centerHorizontal>
						<Spinner />
					</Centered>
				</div>
			)}
			{selection && (
				<ImageViewer
					imageId={selection.id}
					onBackdropClick={resetSelection}
					exif={selection.exif}
				/>
			)}
		</div>
	);
};
