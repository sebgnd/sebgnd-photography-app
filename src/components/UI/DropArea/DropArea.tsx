import React, { FunctionComponent, DragEvent, useState, useCallback, useEffect } from 'react';

import { getFileExtension } from 'libs/path/path';

import { Spinner } from 'components/UI/Spinner/Spinner';
import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';
import { FileElement, FileExtension } from './FileElement/FileElement';

import styles from './DropArea.module.scss';

export type FileState = 'idle' | 'loading' | 'success';

export type FileStatusMap = {
	[name: string]: FileState;
}

export type DropAreaProps = {
	onFileDrop: (files: File[]) => void,
	onFileDelete: (file: File) => void,
	files: File[],
	loading?: boolean,
	textBeforeDrop?: string;
	extensions?: FileExtension[];
}

export const DropArea: FunctionComponent<DropAreaProps> = ({
	files,
	extensions,
	onFileDelete,
	onFileDrop,
	textBeforeDrop = 'Drop your files here',
	loading = false,
}) => {
	const [inDropArea, setInDropArea] = useState<boolean>(false);

	const preventDefault = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		event.persist();
	}

	const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
		preventDefault(event);

		if (loading) {
			return;
		}

		const { dataTransfer } = event;
		const droppedFiles = [...dataTransfer.files];

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

		onFileDrop(newFiles)
		setInDropArea(false);
	}, [files, onFileDrop, loading, extensions]);

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

	useEffect(() => {
		onFileDrop(files)
	}, [onFileDrop, files])

	return (
		<div 
			onDrop={(event) => handleDrop(event)}
			onDragOver={(event) => handleDragOver(event)}
			onDragEnter={(event) => handleDragEnter(event)}
			onDragLeave={(event) => handleDragLeave(event)}
			className={`${styles.dropArea} ${inDropArea ? styles.greenBorder : ''}`}
		>
			{files.length === 0 && (
				<InformationMessage 
					message={textBeforeDrop} 
					messageType="information" 
					centerHorizontal 
					centerVertical 
				/> 
			)}
			{loading && (
				<div className={styles.loadingBlocker}>
					<div className={styles.spinerContainer}>
						<Spinner
							centerHorizontal
							centerVertical
							insideContainer
						/>
					</div>
				</div>
			)}
			<div className={styles.filesContainer}>
				{files.map(file => (
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
