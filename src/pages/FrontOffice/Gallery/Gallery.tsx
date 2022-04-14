import React, { FunctionComponent, useEffect, useCallback, MouseEvent } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useScrolling } from 'hooks/useScrolling';

import { Title } from 'components/Styled/text';
import { SingleImage } from 'components/UI/Image';
import { FlexContainer } from 'components/Styled/container';
import { ImageViewer } from 'components/ImageViewer/ImageViewer';

import { RootState } from 'redux/store';
import { fetchImage, fetchImagesFromCategory } from 'redux/slices/gallery/gallery.thunk';
import { actions } from 'redux/slices/gallery/gallery.slice';
import {
	selectCategoryByName,
	selectImageList,
	selectIsCategoryListLoading,
	selectIsImageListLoading,
	selectSelectedImage,
} from 'redux/slices/gallery/gallery.selector';
import { getImageUrl } from 'libs/image/get-image-url';

import style from './Gallery.module.css';

export const Gallery: FunctionComponent = () => {
    const dispatch = useDispatch();
    
	const { name } = useParams();
	const [search, setSearch] = useSearchParams();

	const [, setScroll] = useScrolling();

    const selectedCategory = useSelector((state: RootState) => {
        if (!name) {
            return null;
        }

        return selectCategoryByName(state, name)
    });
	const images = useSelector(selectImageList);

	const categoryLoading = useSelector(selectIsCategoryListLoading);
	const imagesLoading = useSelector(selectIsImageListLoading);
	const selectedImage = useSelector(selectSelectedImage);

	const handleImageClick = useCallback((_: MouseEvent, imageId: string) => {
		setSearch({ image: imageId });
	}, []);

	const handleBackdropClick = useCallback(() => {
		dispatch(actions.clearImageSelection());
		setScroll(true);
		setSearch({});
	}, [search, dispatch]);

    useEffect(
		() => {
			dispatch(actions.clearImageList());

			if (!selectedCategory) {
				return;
			}

			dispatch(fetchImagesFromCategory(selectedCategory?.id))
    	},
		[selectedCategory, dispatch]
	);

	useEffect(() => {
		const imageId = search.get('image');

		if (imageId) {
			setScroll(false);
			dispatch(fetchImage(imageId));
		}
	}, [search, dispatch]);

    return (
        <div>
			{(!categoryLoading && !imagesLoading) && (
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
								onClick={handleImageClick}
								imageId={img.id}
								categoryId={img.categoryId}
							/>
						))}
					</FlexContainer>
					{selectedImage && (
						<ImageViewer
							onBackdropClick={handleBackdropClick}
							imageId={selectedImage.id}
							exif={selectedImage.exif}
						/>
					)}
				</div>
			)}
        </div>
    )
}