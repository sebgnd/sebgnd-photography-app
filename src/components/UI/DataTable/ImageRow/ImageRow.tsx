import React, { FunctionComponent, useCallback,useMemo } from 'react';

import { getImageUrl } from 'libs/image/get-image-url';

import { IconButton } from 'components/UI/Button';
import { Text } from 'components/UI/Content/Text/Text';
import { Checkbox } from 'components/UI/Form/Checkbox/Checkbox';

import styles from './ImageRow.module.scss';

export type ImageRowProps = {
  imageId: string,
  uploadDate: string,
  selected: boolean,
  onDelete: (id: string) => void,
  onToggleSelection: (id: string) => void,
}

export const ImageRow: FunctionComponent<ImageRowProps> = ({
  imageId,
  selected,
  uploadDate,
  onDelete,
  onToggleSelection,
}) => {
  const handleDelete = useCallback(() => {
    return onDelete(imageId);
  }, [onDelete, imageId]);

  const handleToggle = useCallback(() => {
    return onToggleSelection(imageId);
  }, [imageId, onToggleSelection]);

  const imageUrl = useMemo(() => {
    return getImageUrl(imageId, {
      thumbnail: true,
      size: 'small',
    });
  }, [imageId]);

  return (
    <div className={styles.imageRowContainer}>
      <div className={styles.sideContainer}>
        <div className={styles.checkBox}>
          <Checkbox
            onToggle={handleToggle}
            checked={selected}
          />
        </div>
        <div className={styles.image}>
          <img src={imageUrl} alt={imageId} />
        </div>
        <div className={styles.imageId}>
          <Text size="small" text={`#${imageId}`} />
        </div>
      </div>
      <div className={styles.sideContainer}>
        <div className={styles.deleteButton}>
          <IconButton
            icon="times"
            color="#E24D2D"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}; 
