import { FunctionComponent, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getImageUrlOrUndefined } from 'libs/image/get-image-url';

import { GalleryButton } from 'components/UI/Button';
import { Spinner } from 'components/UI/Spinner/Spinner';
import {
  InformationMessage,
} from 'components/UI/InformationMessage/InformationMessage';

import { Centered } from 'hoc/Centered/Centered';

import {
  selectCategoryList,
  selectIsCategoryListFailed,
  selectIsCategoryListLoading,
} from 'redux/slices/gallery/gallery.selector';

import styles from './Galleries.module.scss';

export const getThumbnailUrl = (imageId: string | null) => {
  return getImageUrlOrUndefined(imageId, {
    size: 'medium',
    thumbnail: true,
  });
};

export const Galleries: FunctionComponent = () => {
  const navigate = useNavigate();

  const categories = useSelector(selectCategoryList);
  const loading = useSelector(selectIsCategoryListLoading);
  const error = useSelector(selectIsCategoryListFailed);

  const navigateToGalleryPage = useCallback((category: string) => () => {
    navigate('/gallery/' + category);
  }, [navigate]);

  const thumbnails = useMemo(() => {
    return categories.map((category) => ({
      imageId: category.thumbnailId,
      galleryName: category.displayName,
      categoryId: category.id,
      categoryName: category.name,
    }));
  }, [categories]);

  return (
    <div className={styles.listBoundary}>
      <div className={styles.listContainer}>
        {(loading) && (
          <Centered centerHorizontal centerVertical fullScreen>
            <Spinner />
          </Centered>
        )}
        {(error) && (
          <Centered centerHorizontal centerVertical fullScreen>
            <InformationMessage
              message="Something went wrong"
              messageType="error"
            />
          </Centered>
        )}
        {(!loading && !error) && (
          <>
            {thumbnails.map(({ imageId, categoryId, galleryName }) => {
              return (
                <div key={categoryId} className={styles.galleryButtonContainer}>
                  <GalleryButton
                    src={getThumbnailUrl(imageId)}
                    imageId={imageId || undefined}
                    onClick={navigateToGalleryPage(categoryId)}
                    categoryDisplayName={galleryName}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
