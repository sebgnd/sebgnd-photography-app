import React, { Fragment, FunctionComponent, useEffect, MouseEvent, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import withEndScroll, { EndScrollProps } from '../../../hoc/withEndScroll';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Viewer from '../../../components/Viewer/Viewer';
import InformationMessage from '../../../components/UI/InformationMessage/InformationMessage';

import RecentList from './RecentList/RecentList';

import { fetchImagesFromPage, imagesEmptied } from '../../../redux/slices/image';
import { selectAllImages, selectImagesStatus, selectAllImagesLoaded, selectCurrentPage } from '../../../redux/selectors/image-selector';

const NB_IMAGE_PER_FETCH = 5;

interface RouteParams {
    imageId?: string;
}

type RecentProps = RouteComponentProps<RouteParams> & EndScrollProps;

const Recent: FunctionComponent<RecentProps> = ({ endWindowReached, match, history }) => {
    const dispatch = useDispatch();
    const images = useSelector(selectAllImages);
    const status = useSelector(selectImagesStatus);
    const finishedLoading = useSelector(selectAllImagesLoaded);
    const currentPage = useSelector(selectCurrentPage);

    const handleClose = () => history.replace('/recent');

    const handleGalleryClick = (_: MouseEvent, categoryId: string) =>  history.push(`/gallery/${categoryId}`);
    const handleImageClick = (_: MouseEvent, imageId: string) => history.push(`/recent/${imageId}`);

    const fetchImages = useCallback(async () => {
        if (status === 'loading' || finishedLoading) {
            return;
        }

        dispatch(
            fetchImagesFromPage({ 
                page: currentPage + 1, 
                itemsPerPage: NB_IMAGE_PER_FETCH
            })
        );
    }, [dispatch, status, finishedLoading, currentPage]);

    useEffect(() => {
        dispatch(
            imagesEmptied()
        );
    }, [dispatch]);

    useEffect(() => {
        if (images.length === 0) {
            fetchImages();
        }
    }, [images, fetchImages]);

    useEffect(() => {
        if (endWindowReached && !finishedLoading) {
            fetchImages();
        }
    }, [endWindowReached, fetchImages, finishedLoading])

    return (
        <Fragment>
            <RecentList images={images} onGalleryClick={handleGalleryClick} onImageClick={handleImageClick} />
            { status === 'loading' && (
                <Spinner centerHorizontal centerVertical fullScreen={images.length === 0} />
            )}
            { status === 'failed' && (
                <InformationMessage messageType="error" centerHorizontal centerVertical fullScreen={images.length === 0} message="Couln't load images" />
            )}
            {(match.params.imageId) && (
                <Viewer 
                    imageId={parseInt(match.params.imageId)}
                    onClose={() => handleClose()}
                />
            )}
        </Fragment>
    )
}

export default withEndScroll(Recent);