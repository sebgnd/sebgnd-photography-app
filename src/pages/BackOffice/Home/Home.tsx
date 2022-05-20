import React, { FunctionComponent, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { ImageRow } from 'components/UI/DataTable/ImageRow/ImageRow';
import { DataTable } from 'components/UI/DataTable/DataTable';
import { Button, DropdownButton } from 'components/UI/Button';

import { selectHasNext, selectHasPrevious, selectImageList } from 'redux/slices/gallery/gallery.selector';
import { ImageItem } from 'redux/slices/gallery/gallery.types';

import styles from './Home.module.css';
import { usePaginatedImageList } from 'hooks/gallery/usePaginatedImageList';

export const Home: FunctionComponent = () => {
	const { fetchNextPage, fetchPreviousPage } = usePaginatedImageList({
		limit: 20,
		fetchOnMount: true,
		resetListOnFetch: true,
	});

	const images = useSelector(selectImageList);
	const hasPrevious = useSelector(selectHasPrevious);
	const hasNext = useSelector(selectHasNext);

	const handleKeyGeneration = useCallback((item: ImageItem) => {
		return item.id;
	}, []);

	return (
		<div className={styles.homeContainer}>
			<div className={styles.homeWrapper}>
				<div className={styles.controlBar}>
					<Button
						variant="classic"
						color="success"
						fullWidth
						label="Upload"
						onClick={() => {}}
					/>
					<Button
						variant="classic"
						color="destructive"
						fullWidth
						label="Delete"
						onClick={() => {}}
					/>
					<DropdownButton
						options={[
							{ value: 'landscape', label: 'Landscape' },
							{ value: 'architecture', label: 'Architecture' },
							{ value: 'astro_photography', label: 'Astro Photograhy' },
						]}
						onClick={() => {}}
						label="Categories"
						fullWidth
					/>
				</div>
				<div className={styles.imageList}>
					<DataTable
						items={images}
						generateRowKey={handleKeyGeneration}
						separator={true}
						renderRow={(item: ImageItem, key) => (
							<ImageRow
								key={key}
								imageId={item.id}
								selected={false}
								uploadDate={item.createdAt}
								onDelete={() => {}}
								onToggleSelection={() => {}}
							/>
						)}
						disableNextButton={!hasNext}
						disablePreviousButton={!hasPrevious}
						onNextClick={fetchNextPage}
						onPreviousClick={fetchPreviousPage}
					/>
				</div>
			</div>
		</div>
	);
};
