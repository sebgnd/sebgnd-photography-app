import React, { useEffect, Fragment, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Parallax } from '../../../components/UI/Parallax/Parallax';

import Landing from './Landing/Landing';
import GalleriesPreview from './GalleryPreview/GalleryPreview';
import About from './About/About';

import { fetchCategories } from '../../../redux/slices/category';
import { imagesEmptied } from '../../../redux/slices/image';
import { selectCategoryStatus, selectAllCategoryThumbnails } from '../../../redux/selectors/category-selector';


const Home: FunctionComponent = () => {
    const dispatch = useDispatch();
    const thumbnails = useSelector(selectAllCategoryThumbnails);
    const status = useSelector(selectCategoryStatus);

    useEffect(() => {
        dispatch(fetchCategories(3));
        dispatch(imagesEmptied())
    }, [dispatch]);

    return (
        <Fragment>
            <Parallax img="images/parallax-1.jpg" speed={0.5}>
                <Landing />
            </Parallax>
            <GalleriesPreview 
                status={status} 
                thumbnails={thumbnails} 
            />
            <Parallax img="images/parallax-2.jpg" speed={0.5} >
                <About />
            </Parallax>
        </Fragment>
    )
}

export default Home;