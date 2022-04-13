import React, { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Title } from 'components/Styled/text';
import { SingleImage } from 'components/UI/Image';
import { FlexContainer } from 'components/Styled/container';

import { RootState } from 'redux/store';
import { fetchImagesFromCategory } from 'redux/slices/gallery/category.thunk';
import { actions } from 'redux/slices/gallery/gallery.slice';
import {
	selectCategoryByName,
	selectImageList,
	selectIsCategoryListLoading,
	selectIsImageListLoading,
} from 'redux/slices/gallery/gallery.selector';
import { getImageUrl } from 'libs/image/get-image-url';

import style from './Gallery.module.css';

export const Gallery: FunctionComponent = () => {
    const dispatch = useDispatch();
    const { name } = useParams();

    const selectedCategory = useSelector((state: RootState) => {
        if (!name) {
            return null;
        }

        return selectCategoryByName(state, name)
    });
	const images = useSelector(selectImageList);

	const categoryLoading = useSelector(selectIsCategoryListLoading);
	const imagesLoading = useSelector(selectIsImageListLoading);

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

    return (
        <div>
			{(!categoryLoading && !imagesLoading) && (
				<>
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
								imageId={img.id}
								categoryId={img.categoryId}
							/>
						))}
					</FlexContainer>
				</>
			)}
        </div>
    )
}