import { FunctionComponent } from 'react';

import { Icon } from 'components/UI/Content/Icon/Icon';
import { Text } from 'components/UI/Content/Text/Text';

import styles from './Footer.module.scss';

export const Footer: FunctionComponent = () => {
	return (
		<footer>
			<div className={styles.footer}>
				<div className={styles.footerItems}>
					<Icon name="copyright" />
					<Text
						type="p"
						className={styles.text}
						text="Copyright 2020 - Sebastien Gnd. All Rights Reserved"
					/>
				</div>
			</div>
		</footer>
	);
}
