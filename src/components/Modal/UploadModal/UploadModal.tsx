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
	}>, 
  onClose: () => void,
  onUpload: (files: File[], categoryId: string) => void,
}

export const UploadModal: FunctionComponent<UploadModalProps> = ({
  isOpen,
  loading,
	categoriesDropdownOptions,
  onClose,
  onUpload,
}) => {
  const [files, setFiles] = useState<File[]>([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState<null | string>(null);
	const [dropdownLabel, setDropdownLabel] = useState('Select a category');

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
		const label = option?.label || 'Select a category';

		setSelectedCategoryId(categoryId);
		setDropdownLabel(label)
	}, [categoriesDropdownOptions]);

  const handleDrop = useCallback((files: File[]) => {
    setFiles(files)
  }, []);

  const handleClose = useCallback(() => {
    setFiles([]);
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(() => {
		if (!selectedCategoryId) {
			return;
		}

    onUpload(files, selectedCategoryId);
  }, [onUpload, selectedCategoryId, files]);

  return (
    <Modal
      title="Upload images"
      onClose={handleClose}
      isOpen={isOpen}
      confirmText="Upload"
      onConfirm={handleConfirm}
      loading={loading}
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
