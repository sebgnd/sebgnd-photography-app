import { FunctionComponent } from 'react';

import type { FileExtension } from 'libs/path/path';

import { Text } from 'components/UI/Content/Text/Text';
import { Icon } from 'components/UI/Content/Icon/Icon';

import { ActionBadge, ActionBadgeProps } from 'hoc/ActionBadge/ActionBadge';

import styles from './FileElement.module.scss';

export type FileProps = {
	name: string;
	extension: FileExtension,
	onBadgeClick: ActionBadgeProps['onBadgeClick'],
}

export const icons: Record<FileExtension, string> = {
	'.png': 'file-image',
	'.jpg': 'file-image',
	'.jpeg': 'file-image',
};

export const FileElement: FunctionComponent<FileProps> = ({
	name,
	extension,
	onBadgeClick,
}) => {
	return (
		<ActionBadge
			iconName="times"
			onBadgeClick={onBadgeClick}
			variant="danger"
		>
			<div className={styles.file}>
				<div className={styles.filePreview}>
					<Icon
						size="2x-large"
						name={icons[extension]}
					/>
				</div>
				<div className={styles.fileName}>
					<Text ellipsis wrap={false} lines={1} type="p" text={name} />
				</div>
			</div>
		</ActionBadge>
	);
};
