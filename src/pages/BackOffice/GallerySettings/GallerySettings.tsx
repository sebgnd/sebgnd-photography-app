import React, { FunctionComponent, useCallback, useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getImageUrl } from 'libs/image/get-image-url';

import { selectCategoryList, selectImageList } from 'redux/slices/gallery/gallery.selector';
import { CategoryItem } from 'redux/slices/gallery/gallery.types';

import { DataTable } from 'components/UI/DataTable/DataTable';
import { CategoryRow } from 'components/UI/DataTable/CategoryRow/CategoryRow';
import { SelectThumbnailModal } from 'components/Modal/SelectThumbnailModal/SelectThumbnailModal';

import styles from './GallerySettings.module.scss';
import { fetchImagesFromCategory } from 'redux/slices/gallery/gallery.thunk';

export const GallerySettings: FunctionComponent = () => {
	const dispatch = useDispatch();

	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

	const categories = useSelector(selectCategoryList);
	const images = useSelector(selectImageList);

	const generateRowKey = useCallback((item: CategoryItem) => {
		return item.id;
	}, []);

	const getThumbnailUrl = useCallback((thumbnailId: string | null) => getImageUrl({
		id: thumbnailId,
		thumbnail: true,
		size: 'small',
	}), []);

	const formattedImages = useMemo(() => {
		return images.map((image) => ({
			id: image.id,
			src: getImageUrl({
				id: image.id,
				size: 'small',
				thumbnail: true,
			})!,
		}))
	}, [images]);

	const handleChangeThumbnailClick = useCallback((categoryId: string) => {
		setSelectedCategoryId(categoryId);
	}, []);

	const handleCancel = useCallback(() => {
		setSelectedCategoryId(null);
	}, []);

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
					renderRow={(item: CategoryItem) => (
						<CategoryRow
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
				onSelect={() => {}}
			/>
		</>
	);
};