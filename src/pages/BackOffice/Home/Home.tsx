import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ImageRow } from 'components/UI/DataTable/ImageRow/ImageRow';
import { DataTable } from 'components/UI/DataTable/DataTable';
import { Button, DropdownButton } from 'components/UI/Button';

import { selectCategoryList, selectCategoryMap, selectHasNext, selectHasPrevious, selectImageList } from 'redux/slices/gallery/gallery.selector';
import { ImageItem } from 'redux/slices/gallery/gallery.types';

import styles from './Home.module.css';
import { usePaginatedImageList } from 'hooks/gallery/usePaginatedImageList';

export const Home: FunctionComponent = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const { fetchNextPage, fetchPreviousPage, fetchFromScratch } = usePaginatedImageList({
		limit: 20,
		resetListOnFetch: true,
	});

	const images = useSelector(selectImageList);
	const categories = useSelector(selectCategoryList);
	const categoryMap = useSelector(selectCategoryMap);

	const hasPrevious = useSelector(selectHasPrevious);
	const hasNext = useSelector(selectHasNext);

	const dropdownOptions = useMemo(() => {
		const categoryOptions = categories.map((category) => {
			return {
				value: category.id,
				label: category.displayName,
			};
		});

		return [...categoryOptions, {
			label: 'All',
			value: 'all',
		}];
	}, [categories]);

	const dropdownLabel = useMemo(() => {
		const selectedCategory = searchParams.get('category');

		return selectedCategory
			? categoryMap[selectedCategory]!.displayName
			: 'Categories';
	}, [searchParams, categoryMap]);

	const handleDropdownClick = useCallback((categoryId: string) => {
		setSearchParams(
			categoryId !== 'all'
				? { category: categoryId }
				: {}
		);
	}, [setSearchParams]);

	const handleKeyGeneration = useCallback((item: ImageItem) => {
		return item.id;
	}, []);

	const handleNext = useCallback(() => {
		fetchNextPage(searchParams.get('category') || undefined);
	}, [searchParams, fetchNextPage]);

	const handlePrevious = useCallback(() => {
		fetchPreviousPage(searchParams.get('category') || undefined);
	}, [searchParams, fetchPreviousPage]);

	useEffect(() => {
		fetchFromScratch(searchParams.get('category') || undefined);
	}, [fetchFromScratch, searchParams]);

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
						options={dropdownOptions}
						onClick={handleDropdownClick}
						label={dropdownLabel}
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
						onNextClick={handleNext}
						onPreviousClick={handlePrevious}
					/>
				</div>
			</div>
		</div>
	);
};
