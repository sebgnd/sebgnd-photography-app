import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ImageRow } from 'components/UI/DataTable/ImageRow/ImageRow';
import { DataTable } from 'components/UI/DataTable/DataTable';
import { Button, DropdownButton } from 'components/UI/Button';

import { fetchImagesPaginated } from 'redux/slices/gallery/gallery.thunk';

import { selectImageList, selectTotalImageList } from 'redux/slices/gallery/gallery.selector';
import { ImageItem } from 'redux/slices/gallery/gallery.types';

import styles from './Home.module.css';

export const IMAGES_PER_PAGE = 20;

export const Home: FunctionComponent = () => {
	const dispatch = useDispatch();

	const images = useSelector(selectImageList);
	const total = useSelector(selectTotalImageList);

	const handleKeyGeneration = useCallback((item: ImageItem) => {
		return item.id;
	}, []);

	useEffect(() => {
		dispatch(
			fetchImagesPaginated({
				limit: IMAGES_PER_PAGE,
				offset: 0,
			}),
		)
	}, [dispatch]);

	const totalPage = Math.round((total || 0) / IMAGES_PER_PAGE);

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
						totalPage={totalPage}
						currentPage={0}
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
						onNextClick={() => {}}
						onPreviousClick={() => {}}
					/>
				</div>
			</div>
		</div>
	);
};
