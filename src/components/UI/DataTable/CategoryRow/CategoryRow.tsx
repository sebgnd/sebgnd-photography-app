import React, { FunctionComponent } from 'react';

import { Svg } from 'components/UI/Content/Svg/Svg';
import { Text } from 'components/UI/Content/Text/Text';
import { Button } from 'components/UI/Button';

import styles from './CategoryRow.module.scss';

export type CategoryRowProps = {
	thumbnailUrl?: string,
	categoryId: string,
	categoryName: string,
	onChangeThumbnailClick: (categoryId: string) => void,
}

export const CategoryRow: FunctionComponent<CategoryRowProps> = ({
	thumbnailUrl,
	categoryId,
	categoryName,
	onChangeThumbnailClick,
}) => {
	return (
		<div className={styles.categoryRowContainer}>
			<div className={styles.leftContainer}>
				<div className={styles.image}>
					{thumbnailUrl
						? (
							<img src={thumbnailUrl} alt={categoryId} />
						)
						: (
							<Svg name="processing-image" />
						)
					}
				</div>
				<div className={styles.categoryName}>
					<Text type="h3" size="regular" text={categoryName} />
				</div>
			</div>
			<Button
				label="Change thumbnail"
				onClick={() => onChangeThumbnailClick(categoryId)}
			/>
		</div>
	);
}