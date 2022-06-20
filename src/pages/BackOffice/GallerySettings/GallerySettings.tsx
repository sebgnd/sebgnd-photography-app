import React, { FunctionComponent, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoryList } from 'redux/slices/gallery/gallery.selector';
import { CategoryItem } from 'redux/slices/gallery/gallery.types';

import { DataTable } from 'components/UI/DataTable/DataTable';
import { CategoryRow } from 'components/UI/DataTable/CategoryRow/CategoryRow';

import styles from './GallerySettings.module.scss';
import { getImageUrl } from 'libs/image/get-image-url';

export const GallerySettings: FunctionComponent = () => {
	const categories = useSelector(selectCategoryList);

	const generateRowKey = useCallback((item: CategoryItem) => {
		return item.id;
	}, []);

	const getThumbnailUrl = useCallback((thumbnailId: string | null) => getImageUrl({
		id: thumbnailId,
		thumbnail: true,
		size: 'small',
	}), []);

	const handleChangeThumbnailClick = useCallback((categoryId: string) => {}, []);

	return (
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
						onChangeThumbnailClick={handleChangeThumbnailClick}
					/>
				)}
			/>
		</div>
	);
};