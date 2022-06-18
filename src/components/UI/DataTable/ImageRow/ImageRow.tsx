import React, { FunctionComponent, useCallback,useMemo } from 'react';

import { getImageUrl } from 'libs/image/get-image-url';

import { IconButton } from 'components/UI/Button';
import { Text } from 'components/UI/Content/Text/Text';
import { Svg } from 'components/UI/Content/Svg/Svg';
import { Label } from 'components/UI/Content/Label/Label';

import styles from './ImageRow.module.scss';
import { Spinner } from 'components/UI/Spinner/Spinner';

export type ImageRowProps = {
  imageId: string,
  thumbnail: boolean,
  selected: boolean,
	status: 'error' | 'processing' | 'valid',
  onDelete: (id: string) => void,
}

export const ImageRow: FunctionComponent<ImageRowProps> = ({
  imageId,
  thumbnail,
	status,
  onDelete,
}) => {
  const handleDelete = useCallback(() => {
    return onDelete(imageId);
  }, [onDelete, imageId]);

  const imageUrl = useMemo(() => {
    return getImageUrl(imageId, {
      thumbnail: true,
      size: 'small',
    });
  }, [imageId]);

  return (
    <div className={styles.imageRowContainer}>
      <div className={styles.sideContainer}>
        <div className={styles.image}>
					{status === 'valid'
						? (
							<img src={imageUrl} alt={imageId} />
						)
						: (
							<Svg name="processing-image" />
						)
					}
        </div>
        <Label color="default" text={`#${imageId}`} />
        {thumbnail && (
          <Label color="info" text="Category thumbnail" />
        )}
      </div>
      <div className={styles.sideContainer}>
				{status === 'processing' && (
					<div className={styles.processing}>
						<Spinner size="tiny" />
						<Text size="small" text="Processing ..." />
					</div>
				)}
        <div className={styles.deleteButton}>
          <IconButton
            icon="times"
            color="destructive"
            variant="light"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}; 
