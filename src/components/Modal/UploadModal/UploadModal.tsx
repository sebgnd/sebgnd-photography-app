import React, { FunctionComponent, useState, useCallback } from 'react';

import { Modal } from 'components/UI/Modal/Modal';
import { DropArea } from 'components/UI/DropArea/DropArea';

export type UploadModalProps = {
  isOpen: boolean,
  loading: boolean,
  onClose: () => void,
  onUpload: (files: File[]) => void,
}

export const UploadModal: FunctionComponent<UploadModalProps> = ({
  isOpen,
  loading,
  onClose,
  onUpload,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDelete = useCallback((file: File) => {
    setFiles((prevFiles) => {
      return prevFiles.filter((currentFile) => {
        return currentFile.name !== file.name;
      });
    });
  }, []);

  const handleDrop = useCallback((files: File[]) => {
    setFiles(files)
  }, []);

  const handleClose = useCallback(() => {
    setFiles([]);
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(() => {
    onUpload(files);
  }, [onUpload, files]);

  return (
    <Modal
      title="Upload images"
      onClose={handleClose}
      isOpen={isOpen}
      confirmText="Upload"
      onConfirm={handleConfirm}
      loading={loading}
    >
      <DropArea
        files={files}
        textBeforeDrop="Drop your images here"
        loading={loading}
        onFileDrop={handleDrop}
        onFileDelete={handleDelete}
      />
    </Modal>
  );
};
