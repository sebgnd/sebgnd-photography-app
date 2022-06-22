import React, { FunctionComponent, useCallback, useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getImageUrl, getImageUrlOrUndefined } from 'libs/image/get-image-url';

import { fetchImagesFromCategory, setCategoryThumbnail } from 'redux/slices/gallery/gallery.thunk';
import { selectCategoryList, selectImageList } from 'redux/slices/gallery/gallery.selector';
import { CategoryItem } from 'redux/slices/gallery/gallery.types';

import { DataTable } from 'components/UI/DataTable/DataTable';
import { CategoryRow } from 'components/UI/DataTable/CategoryRow/CategoryRow';
import { SelectThumbnailModal } from 'components/Modal/SelectThumbnailModal/SelectThumbnailModal';

import styles from './GallerySettings.module.scss';

export const GallerySettings: FunctionComponent = () => {
	const dispatch = useDispatch();

	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

	const categories = useSelector(selectCategoryList);
	const images = useSelector(selectImageList);

	const generateRowKey = useCallback((item: CategoryItem) => {
		return item.id;
	}, []);

	const getThumbnailUrl = useCallback((thumbnailId: string | null) => {
		return getImageUrlOrUndefined(thumbnailId, {
			thumbnail: true,
			size: 'small',
		})
	}, []);

	const formattedImages = useMemo(() => {
		return images.map((image) => ({
			id: image.id,
			src: getImageUrl(image.id, {
				size: 'small',
				thumbnail: true,
			}),
		}))
	}, [images]);

	const handleChangeThumbnailClick = useCallback((categoryId: string) => {
		setSelectedCategoryId(categoryId);
	}, []);

	const handleCancel = useCallback(() => {
		setSelectedCategoryId(null);
	}, []);

	const handleSelect = useCallback(async (imageId: string) => {
		if (!selectedCategoryId) {
			return;
		}

		await dispatch(
			setCategoryThumbnail({
				categoryId: selectedCategoryId,
				thumbnailId: imageId,
			}),
		)

		setSelectedCategoryId(null);
	}, [dispatch, selectedCategoryId]);

	useEffect(() => {
		if (selectedCategoryId) {
			dispatch(fetchImagesFromCategory(selectedCategoryId))
		}
	}, [dispatch, selectedCategoryId])

	return (
		<>
			<div className={styles.gallerySettingsContainer}>
				<DataTable
					separator
					dynamicContent={false}
					items={categories}
					generateRowKey={generateRowKey}
					renderRow={(item: CategoryItem, key: string) => (
						<CategoryRow
							key={key}
							categoryId={item.id}
							categoryName={item.displayName}
							thumbnailUrl={getThumbnailUrl(item.thumbnailId)}
							thumbnailId={item.thumbnailId || undefined}
							onChangeThumbnailClick={handleChangeThumbnailClick}
						/>
					)}
				/>
			</div>
			<SelectThumbnailModal
				isOpen={selectedCategoryId !== null}
				onCancel={handleCancel}
				images={formattedImages}
				onSelect={handleSelect}
			/>
		</>
	);
};