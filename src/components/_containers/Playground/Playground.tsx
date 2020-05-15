import React, { FunctionComponent, Fragment } from 'react';

import { Button, RoundButton, GalleryButton } from '../../UI/Button';
import { RecentImage, SingleImage, ViewerImage } from '../../UI/Image';

import Image from '../../../helper/image/Image';
import Category from '../../../helper/category/Category';

const Playground: FunctionComponent = () => {
    const placehodlerCategory = new Category('test', 'Test');
    const placeHolderImage = new Image(1, new Date(), placehodlerCategory);

    return (
        <Fragment>
            <ViewerImage image={placeHolderImage} />
            <RecentImage image={placeHolderImage} />
            <SingleImage image={placeHolderImage} />
        </Fragment>
    )
}

export default Playground;