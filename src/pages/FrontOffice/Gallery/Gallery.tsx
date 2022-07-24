import { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'redux/store';

import { getImageUrl } from 'libs/image/get-image-url';

import { useImageSelection } from 'hooks/gallery';

import { Text } from 'components/UI/Content/Text/Text';
import { SingleImage } from 'components/UI/Image';
import { FlexContainer } from 'components/Styled/container';
import { ImageViewer } from 'components/ImageViewer/ImageViewer';
import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';
import { Spinner } from 'components/UI/Spinner/Spinner';

import { Centered } from 'hoc/Centered/Centered';

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
	const dispatch = useAppDispatch();
    
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
						<Text className={style.title} bold size="2x-large" text={selectedCategory?.displayName || ''} />
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
					<Centered centerHorizontal centerVertical fullScreen>
						<Spinner />
					</Centered>
				)}
				{(categoryError || imagesError) && (
					<Centered centerHorizontal centerVertical fullScreen>
						<InformationMessage
							messageType="error"
							message="Something went wrong"
						/>
					</Centered>
				)}
			</>
    )
}