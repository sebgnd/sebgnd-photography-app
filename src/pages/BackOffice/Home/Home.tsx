import React, { FunctionComponent } from 'react';

import { Button, DropdownButton } from 'components/UI/Button';

import styles from './Home.module.css';
import { stubArray } from 'lodash';

export const Home: FunctionComponent = () => {
	return (
		<div className={styles.homeContainer}>
			<div className={styles.homeWrapper}>
				<div className={styles.controlBar}>
					<Button
						variant="classic"
						size="medium"
						color="#B6FFAD"
						fullWidth
						label="Upload"
						onClick={() => {}}
					/>
					<Button
						variant="classic"
						size="medium"
						color="#FFADAD"
						fullWidth
						label="Delete"
						onClick={() => {}}
					/>
					<DropdownButton
						size="medium"
						options={[
							{ value: 'landscape', label: 'Landscape' },
							{ value: 'architecture', label: 'Architecture' },
							{ value: 'astro_photography', label: 'Astro Photograhy' },
						]}
						onClick={() => {}}
						label="Categories"
						fullWidth
					/>
				</div>
				<div className={styles.imageList}>
					<div className={styles.temp} />
				</div>
			</div>
		</div>
	);
};
