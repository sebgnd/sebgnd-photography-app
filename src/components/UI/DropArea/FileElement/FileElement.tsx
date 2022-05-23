import React, { FunctionComponent } from 'react';

import { Text } from 'components/UI/Content/Text/Text';
import { Icon } from 'components/UI/Content/Icon/Icon';

import withActionBadge, { WithActionBadgeProps } from 'hoc/withActionBadge';

import styles from './FileElement.module.scss';

export type FileExtension = 'png' | 'jpg';

export type FileProps = {
	name: string;
	extension: FileExtension,
}

export const icons: Record<FileExtension, string> = {
	'png': 'file-image',
	'jpg': 'file-image',
};

export const FileElement: FunctionComponent<FileProps & WithActionBadgeProps> = withActionBadge(({
	name,
	extension,
}) => {
	return (
		<div className={styles.file}>
			<div className={styles.filePreview}>
				<Icon size="2x-large" name={icons[extension]} />
			</div>
			<div className={styles.fileName}>
				<Text ellipsis wrap={false} lines={1} type="p" text={name} />
			</div>
		</div>
	);
}, { name: 'times' });
