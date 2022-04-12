import React, { MouseEvent, FunctionComponent, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Viewer from '../../../components/Viewer/Viewer';

import { RootState } from '../../../redux/types';
import { fetchImagesFromCategory } from '../../../redux/slices/image';
import { fetchCategory, categorySelected } from '../../../redux/slices/category';

import { selectAllImages, selectImagesStatus } from '../../../redux/selectors/image-selector';
import { selectCategoryStatus, selectCurrentCategory, selectCategoryById } from '../../../redux/selectors/category-selector';

import ImageList from './ImageList/ImageList';

interface RouteParams {
    id: string;
    imageId?: string
}

type GalleryProps = RouteComponentProps<RouteParams>;

const Gallery: FunctionComponent<GalleryProps> = ({ match, history }) => {
    const dispatch = useDispatch();

    // Data
    const images = useSelector(selectAllImages);
    const category = useSelector(selectCurrentCategory);
    const categoryLoaded = useSelector((state: RootState) => selectCategoryById(state, match.params.id));

    // Loading status
    const imagesStatus = useSelector(selectImagesStatus);
    const categoryStatus = useSelector(selectCategoryStatus);

    const handleImageClick = (_: MouseEvent, imageId: string, categoryId: string) => {
        history.push(`/gallery/${match.params.id}/${imageId}`);
    }

    const handleClose = () => {
        history.replace(`/gallery/${match.params.id}`);
    }

    useEffect(
		() => {
			if (!categoryLoaded) {
				dispatch(fetchCategory(match.params.id));
			}
			
			if (categoryLoaded) {
				dispatch(categorySelected(match.params.id));
			}

			dispatch(fetchImagesFromCategory(match.params.id));
		}, 
		[dispatch, categoryLoaded, match.params]);

    return (
        <>
            <ImageList 
                images={images} 
                category={category!}
                onImageClick={handleImageClick}
                categoryStatus={categoryStatus}
                imagesStatus={imagesStatus}
            />
            {(match.params.imageId && images.length) && (
                <Viewer 
                    categoryId={match.params.id}
                    imageId={parseInt(match.params.imageId)} 
                    onClose={() => handleClose()} />
            )}
        </>
    )
} 

export default withRouter(Gallery);