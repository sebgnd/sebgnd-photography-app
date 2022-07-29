import { FunctionComponent } from 'react';

import { Text } from 'components/UI/Content/Text/Text';
import { Button } from 'components/UI/Button';
import { SmallImage } from 'components/UI/Image/SmallImage/SmallImage';

import styles from './CategoryRow.module.scss';

export type CategoryRowProps = {
	thumbnailUrl?: string,
	thumbnailId?: string,
	categoryId: string,
	categoryName: string,
	onChangeThumbnailClick: (categoryId: string) => void,
}

export const CategoryRow: FunctionComponent<CategoryRowProps> = ({
	thumbnailUrl,
	thumbnailId,
	categoryId,
	categoryName,
	onChangeThumbnailClick,
}) => {
	return (
		<div className={styles.categoryRowContainer}>
			<div className={styles.leftContainer}>
				<SmallImage
					id={thumbnailId}
					src={thumbnailUrl}
				/>
				<div className={styles.categoryName}>
					<Text type="p" size="regular" text={categoryName} />
				</div>
			</div>
			<Button
				label="Change thumbnail"
				onClick={() => onChangeThumbnailClick(categoryId)}
			/>
		</div>
	);
}