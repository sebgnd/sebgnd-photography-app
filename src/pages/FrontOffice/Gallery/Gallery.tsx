import React, { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getImageUrl } from 'libs/image/get-image-url';

import { useImageSelection } from 'hooks/gallery/useImageSelection';

import { Title } from 'components/Styled/text';
import { SingleImage } from 'components/UI/Image';
import { FlexContainer } from 'components/Styled/container';
import { ImageViewer } from 'components/ImageViewer/ImageViewer';
import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';

import { Spinner } from 'components/UI/Spinner/Spinner';

import { RootState } from 'redux/store';
import { fetchImagesFromCategory } from 'redux/slices/gallery/gallery.thunk';
import {
	selectCategoryById,
	selectImageList,
	selectIsCategoryListFailed,
	selectIsCategoryListLoading,
	selectIsImageListFailed,
	selectIsImageListLoading,
} from 'redux/slices/gallery/gallery.selector';

import style from './Gallery.module.css';

export const Gallery: FunctionComponent = () => {
	const dispatch = useDispatch();
    
	const { id } = useParams();
	const { resetSelection, selectImage, selection } = useImageSelection();

	const selectedCategory = useSelector((state: RootState) => {
		if (!id) {
			return null;
		}

		return selectCategoryById(state, id)
	});
	const images = useSelector(selectImageList);

	const categoryLoading = useSelector(selectIsCategoryListLoading);
	const imagesLoading = useSelector(selectIsImageListLoading);
	const categoryError = useSelector(selectIsCategoryListFailed);
	const imagesError = useSelector(selectIsImageListFailed);

	const canShowList = !categoryLoading
		&& !imagesLoading
		&& !categoryError
		&& !imagesError;

	useEffect(
		() => {
			if (!selectedCategory) {
				return;
			}

			dispatch(fetchImagesFromCategory(selectedCategory?.id))
    },
		[selectedCategory, dispatch]
	);

    return (
			<>
				{canShowList && (
					<div>
						<Title className={style.title} color="#000">{selectedCategory?.displayName}</Title>
						<FlexContainer
							className={style.imageList}
							alignItems="center"
							justifyContent="center"
							wrap={true}
						>
							{images.map((img) => (
								<SingleImage
									src={getImageUrl(img.id, {
										thumbnail: true,
										size: 'medium'
									})}
									key={img.id}
									onClick={selectImage}
									imageId={img.id}
									categoryId={img.categoryId}
								/>
							))}
						</FlexContainer>
						{selection && (
							<ImageViewer
								onBackdropClick={resetSelection}
								imageId={selection.id}
								exif={selection.exif}
							/>
						)}
					</div>
				)}
				{(categoryLoading || imagesLoading) && (
					<Spinner centerHorizontal centerVertical fullScreen />
				)}
				{(categoryError || imagesError) && (
					<InformationMessage
						centerHorizontal
						centerVertical
						fullScreen
						messageType="error"
						message="Something went wrong"
					/>
				)}
			</>
    )
}