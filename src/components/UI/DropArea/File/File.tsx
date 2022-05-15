import React, { FunctionComponent } from 'react';

import withActionBadge, { WithActionBadgeProps } from '../../../../hoc/withActionBadge';

import { Spinner } from 'components/UI/Spinner/Spinner';

import styles from './File.module.css';

interface FileProps {
	previewIcon?: string;
	name: string;
	loading?: boolean;
}

const File: FunctionComponent<FileProps & WithActionBadgeProps> = ({
	previewIcon = 'file',
	name,
	loading = false,
}) => {
	return (
		<div className={`${styles.file} ${loading ? styles.loading : ''}`}>
			{loading && (
				<Spinner
					centerHorizontal
					centerVertical
					insideContainer
					size="small"
					zIndex={500}
				/>
			)}
			<div className={styles.filePreview}>
				<i className={`fas fa-${previewIcon}`}></i>
			</div>
			<div className={styles.fileName}>
				<p>{name}</p>
			</div>
		</div>
	);
}

export default withActionBadge(File, { name: 'times' });