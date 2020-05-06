import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GalleryButtonContainer, GalleryImage, Img, GalleryName, GalleryButtonWrapper } from './gallery-button-style';
import { Text } from '../../regular/text';
import { ButtonContainer } from '../../regular/container';

import Image from '../../../helper/Image';
import Paths from '../../../helper/Paths';

interface GalleryButtonProp extends RouteComponentProps {
    galleryDisplayName: string;
    galleryName: string;
    image: Image;
}

const GalleryButton: FunctionComponent<GalleryButtonProp> = (props) => {
    const goToGallery = (gallery: string) => {
        const url = Paths.galleryWithName(props.galleryName);
        props.history.push(url);
    }

    const imageSource = Paths.mediumThumbnailImage(); 

    return (
        <GalleryButtonContainer>
            <GalleryButtonWrapper>
                <ButtonContainer onClick={() => goToGallery(props.galleryName)}>

                    <GalleryImage>
                        <Img src={imageSource} alt={props.image.getId().toString()} />
                    </GalleryImage>

                    <GalleryName id="gallery-name">
                        <Text size="medium" color="black" weight="normal">{props.galleryDisplayName}</Text>
                    </GalleryName>

                </ButtonContainer>
            </GalleryButtonWrapper>
        </GalleryButtonContainer>
    )
}

export default withRouter(GalleryButton);