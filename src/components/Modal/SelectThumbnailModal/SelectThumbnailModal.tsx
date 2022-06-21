import React, { useCallback, useState } from 'react';
import type { FunctionComponent } from 'react';

import { Modal } from 'components/UI/Modal/Modal';

import styles from './SelectThumbnailModal.module.scss';
import { SmallImage } from 'components/UI/Image/SmallImage/SmallImage';
import { Centered } from 'hoc/Centered/Centered';
import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';

export type SelectThumbnailModalProps = {
  images: Array<{
    id: string,
    src: string,
  }>,
  isOpen: boolean,
  onSelect: (id: string) => void,
  onCancel: () => void,
}

export const SelectThumbnailModal: FunctionComponent<SelectThumbnailModalProps> = ({
  images,
  isOpen,
  onCancel,
  onSelect,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleImageSelection = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleConfirm = useCallback(() => {
    if (!selectedId) {
      return;
    }

    onSelect(selectedId);
  }, [onSelect, selectedId]);

	const handleCancel = useCallback(() => {
		setSelectedId(null);
		onCancel();
	}, [onCancel]);

  return (
    <Modal
      isOpen={isOpen}
      confirmText="Select thumbnail"
      cancelText="Cancel"
      title="Select category thumbnail"
      onCancel={handleCancel}
      onClose={handleCancel}
      onConfirm={handleConfirm}
    >
      <div className={styles.imageListContainer}>
        {images.length !== 0 && (
          images.map(({ id, src }) => (
            <div className={styles.imageContainer}>
              <SmallImage
                clickable
                id={id}
                src={src}
                placeholder={false}
                onClick={handleImageSelection}
								selected={id === selectedId}
              />
            </div>
          ))
        )}
        {images.length === 0 && (
          <div className={styles.emptyCategory}>
            <Centered centerHorizontal centerVertical>
              <InformationMessage message="Empty category" messageType="information" />
            </Centered>
          </div>
        )}
      </div>
    </Modal>
  );
};
