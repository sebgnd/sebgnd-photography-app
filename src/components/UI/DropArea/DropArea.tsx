import { FunctionComponent, DragEvent, useState, useCallback, useEffect, useRef, ChangeEvent, useMemo } from 'react';

import { getFileExtension, getPossibleExtensionsByType } from 'libs/path/path';
import type { FileExtension, FileType } from 'libs/path/path';

import { Spinner } from 'components/UI/Spinner/Spinner';
import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';

import { FileElement } from './FileElement/FileElement';

import { Centered } from 'hoc/Centered/Centered';

import styles from './DropArea.module.scss';
import { combineClasses } from 'libs/css/css';

export type FileState = 'idle' | 'loading' | 'success';
export type FileStatusMap = {
  [name: string]: FileState;
}

export type DropAreaProps = {
  onFileDrop: (files: File[]) => void,
  onFileDelete: (file: File) => void,
  files: File[],
  loading?: boolean,
  instructionText?: string;
  chooseFilesText?: string,
  errorText?: string,
  chooseFilesTextOnError?: string,
  types?: FileType[];
}

export const DropArea: FunctionComponent<DropAreaProps> = ({
  files,
  types,
  chooseFilesText,
  chooseFilesTextOnError,
  onFileDelete,
  onFileDrop,
  instructionText = 'Drop your files here',
  errorText = 'Wrong files',
  loading = false,
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const [inDropArea, setInDropArea] = useState<boolean>(false);
  const [error, setError] = useState(false);

  const extensions = useMemo(() => {
    return types?.reduce((acc, type) => [
      ...acc,
      ...getPossibleExtensionsByType(type),
    ], [] as FileExtension[]);
  }, [types]);

  const preventDefault = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();
  };

  const handleNewFiles = useCallback((droppedFiles: File[]) => {
    setError(false);

    const filesWithExtension = droppedFiles.filter((file) => {
      const { name } = file;

      if (!extensions) {
        return true;
      }

      return extensions.some((extension) => {
        return name.endsWith(extension);
      });
    });

    /**
     * Remove duplicate files. Only look at the file names, not their location
     */
    const currentFileNames = new Set(
      files.map(({ name }) => name),
    );

    const newFiles = [...files, ...filesWithExtension.filter(({ name }) => {
      return !currentFileNames.has(name);
    })];

    if (filesWithExtension.length === 0) {
      setError(true);

      if (files.length !== 0) {
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }

    onFileDrop(newFiles);
    setInDropArea(false);
  }, [onFileDrop, extensions, files]);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      preventDefault(event);

      if (loading) {
        return;
      }

      const { dataTransfer } = event;

      handleNewFiles([...dataTransfer.files]);
    },
    [handleNewFiles, loading],
  );

  const handleSelect = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (loading || !event.target.files) {
        return;
      }

      handleNewFiles([...event.target.files]);
    },
    [loading, handleNewFiles],
  );

  const handleDragEnter = useCallback((event: DragEvent<HTMLDivElement>) => {
    preventDefault(event);
    setInDropArea(true && !loading);
  }, [loading]);

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    preventDefault(event);
    setInDropArea(false && !loading);
  }, [loading]);

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    preventDefault(event);

    if (!inDropArea) {
      setInDropArea(true && !loading);
    }
  }, [inDropArea, loading]);

  const handleInstructionMessageClick = useCallback(() => {
    if (!fileInput.current) {
      return;
    }

    fileInput.current.click();
  }, []);

  useEffect(() => {
    onFileDrop(files);
  }, [onFileDrop, files]);

  return (
    <div
      onDrop={(event) => handleDrop(event)}
      onDragOver={(event) => handleDragOver(event)}
      onDragEnter={(event) => handleDragEnter(event)}
      onDragLeave={(event) => handleDragLeave(event)}
      className={combineClasses(
        styles.dropArea,
        (error && !inDropArea) ? styles.redBorder : undefined,
        inDropArea ? styles.greenBorder : undefined,
      )}
    >
      <input
        style={{
          display: 'none',
        }}
        type="file"
        multiple
        ref={fileInput}
        accept={extensions?.join(',')}
        onChange={handleSelect}
      />
      {(files.length === 0 && !error) && (
        <Centered centerHorizontal centerVertical>
          <InformationMessage
            message={instructionText}
            clickableMessage={chooseFilesText}
            onMessageClick={handleInstructionMessageClick}
            messageType="information"
          />
        </Centered>
      )}
      {(files.length === 0 && error) && (
        <Centered centerHorizontal centerVertical>
          <InformationMessage
            message={errorText}
            messageType="error"
            clickableMessage={chooseFilesTextOnError}
            onMessageClick={handleInstructionMessageClick}
          />
        </Centered>
      )}
      {(loading) && (
        <div className={styles.loadingBlocker}>
          <div className={styles.spinerContainer}>
            <Centered centerHorizontal centerVertical insideContainer>
              <Spinner />
            </Centered>
          </div>
        </div>
      )}
      <div className={styles.filesContainer}>
        {files.map((file) => (
          <FileElement
            extension={getFileExtension(file.name) as FileExtension}
            key={file.name}
            name={file.name}
            onBadgeClick={() => onFileDelete(file)}
          />
        ))}
      </div>
    </div>
  );
};
