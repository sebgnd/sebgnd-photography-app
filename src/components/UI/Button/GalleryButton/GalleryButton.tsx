import { FunctionComponent } from 'react';

import { Text } from 'components/UI/Content/Text/Text';
import { BaseButtonContainer } from 'components/UI/Button';
import { ImageFade } from 'components/UI/Image/ImageFade/ImageFade';

import styles from './GalleryButton.module.scss';
import { Svg } from 'components/UI/Content/Svg/Svg';

export type GalleryButtonProp = {
  src?: string;
  imageId?: string;
  onClick: () => void;
  categoryDisplayName: string;
}

export const GalleryButton: FunctionComponent<GalleryButtonProp> = ({ src, imageId, onClick, categoryDisplayName }) => {
  return (
    <div className={styles.galleryButtonContainer}>
      <div className={styles.galleryButtonWrapper}>
        <BaseButtonContainer onClick={() => onClick()}>
          <div className={styles.galleryImage}>
            {(imageId && src) ? (
              <ImageFade
                className={styles.image}
                src={src}
                alt={imageId}
              />
            ) : (
              <Svg name="processing-image" size="100%" />
            )}
          </div>

          <div id="gallery-name" className={styles.galleryName}>
            <Text text={categoryDisplayName} />
          </div>
        </BaseButtonContainer>
      </div>
    </div>
  );
};
