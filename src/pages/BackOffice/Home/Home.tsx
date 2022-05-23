import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { usePaginatedImageList } from 'hooks/gallery';
import { useToggle } from 'hooks';

import { ImageRow } from 'components/UI/DataTable/ImageRow/ImageRow';
import { DataTable } from 'components/UI/DataTable/DataTable';
import { Button, DropdownButton } from 'components/UI/Button';

import { UploadModal } from 'components/Modal/UploadModal/UploadModal';

import {
	selectHasNext,
	selectImageList,
	selectHasPrevious,
	selectCategoryMap,
	selectCategoryList,
	selectIsImageListFailed,
	selectIsImageListLoading
} from 'redux/slices/gallery/gallery.selector';
import { ImageItem } from 'redux/slices/gallery/gallery.types';

import styles from './Home.module.css';

export const Home: FunctionComponent = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const { fetchNextPage, fetchPreviousPage, fetchFromScratch } = usePaginatedImageList({
		limit: 20,
		resetListOnFetch: true,
	});

	const [isUploadModalOpen, toggleUploadModal] = useToggle(false);

	const images = useSelector(selectImageList);
	const categories = useSelector(selectCategoryList);
	const categoryMap = useSelector(selectCategoryMap);
	const isLoading = useSelector(selectIsImageListLoading);
	const isError = useSelector(selectIsImageListFailed);

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
		const selectedCategoryId = searchParams.get('category');
		const selectedCategory = selectedCategoryId
			? categoryMap[selectedCategoryId]
			: null;

		return selectedCategoryId && selectedCategory
			? selectedCategory.displayName
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
		<>
			<div className={styles.homeContainer}>
				<div className={styles.homeWrapper}>
					<div className={styles.controlBar}>
						<Button
							variant="classic"
							color="success"
							fullWidth
							label="Upload"
							onClick={toggleUploadModal}
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
							error={isError}
							loading={isLoading}
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
			<UploadModal
				onClose={toggleUploadModal}
				onUpload={() => {}}
				loading={false}
				isOpen={isUploadModalOpen}
			/>
		</>
	);
};
