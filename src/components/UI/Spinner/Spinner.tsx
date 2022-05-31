import React, { FunctionComponent } from 'react';

import withCentering, { CenteringProps } from '../../../hoc/withCentering';

import styles from './Spinner.module.scss';
interface SpinnerProps {
	size?: 'normal' | 'small' | 'tiny';
}
export const Spinner: FunctionComponent<SpinnerProps & CenteringProps> = withCentering(({
	zIndex,
	size = 'normal'
}) => {
	return (
		<div className={[styles.spinner, styles[size]].join(' ')} style={{ zIndex }} />
	)
});
