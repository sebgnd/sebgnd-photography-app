import { FunctionComponent, useState, useCallback } from 'react';

import { Modal } from 'components/UI/Modal/Modal';
import { DropArea } from 'components/UI/DropArea/DropArea';
import { DropdownButton } from 'components/UI/Button';

import styles from './UploadModal.module.scss';

export type UploadModalProps = {
  isOpen: boolean,
  loading: boolean,
	categoriesDropdownOptions: Array<{
		label: string,
		value: string,
    default?: boolean,
	}>, 
  onClose: () => void,
  onUpload: (files: File[], categoryId: string) => void,
}

const DEFAULT_DROPDOWN_LABEL = 'Select a category';

export const UploadModal: FunctionComponent<UploadModalProps> = ({
  isOpen,
  loading,
	categoriesDropdownOptions,
  onClose,
  onUpload,
}) => {
  const [files, setFiles] = useState<File[]>([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState<null | string>(null);
	const [dropdownLabel, setDropdownLabel] = useState(DEFAULT_DROPDOWN_LABEL);

  const handleDelete = useCallback((file: File) => {
    setFiles((prevFiles) => {
      return prevFiles.filter((currentFile) => {
        return currentFile.name !== file.name;
      });
    });
  }, []);

	const handleDropdownClick = useCallback((categoryId: string) => {
		const option = categoriesDropdownOptions.find((option) => {
			return option.value === categoryId
		});
		const label = option?.label || DEFAULT_DROPDOWN_LABEL;

		setSelectedCategoryId(categoryId);
		setDropdownLabel(label)
	}, [categoriesDropdownOptions]);

  const handleDrop = useCallback((files: File[]) => {
    setFiles(files)
  }, []);

  const handleConfirm = useCallback(() => {
		if (!selectedCategoryId) {
			return;
		}

    onUpload(files, selectedCategoryId);
  }, [onUpload, selectedCategoryId, files]);

  const handleClearingFilesAfterClose = useCallback(() => {
    setFiles([]);
    setSelectedCategoryId(null);
    setDropdownLabel(DEFAULT_DROPDOWN_LABEL);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      loading={loading}
      title="Upload images"
      confirmText="Upload"
      onClose={onClose}
      onConfirm={handleConfirm}
      onCloseAnimationFinished={handleClearingFilesAfterClose}
    >
			<div className={styles.dropdownContainer}>
				<DropdownButton
					options={categoriesDropdownOptions}
					label={dropdownLabel}
					onClick={handleDropdownClick}
					fullWidth
				/>
			</div>
			<div className={styles.dropAreaContainer}>
				<DropArea
					files={files}
					textBeforeDrop="Drop your images here"
					loading={loading}
					onFileDrop={handleDrop}
					onFileDelete={handleDelete}
				/>
			</div>
    </Modal>
  );
};
