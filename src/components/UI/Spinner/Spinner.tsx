import React, { FunctionComponent } from 'react';

import styles from './Spinner.module.scss';

export type SpinnerProps = {
	size?: 'normal' | 'small' | 'tiny';
	zIndex?: number,
}

export const Spinner: FunctionComponent<SpinnerProps> = ({
	zIndex,
	size = 'normal'
}) => {
	return (
		<div className={[styles.spinner, styles[size]].join(' ')} style={{ zIndex }} />
	)
};
