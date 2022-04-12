import React, { FunctionComponent } from 'react';

import withCentering, { CenteringProps } from '../../../hoc/withCentering';

import styles from './Spinner.module.css';
interface SpinnerProps {
    size?: 'normal' | 'small' | 'tiny';
}

const Spinner: FunctionComponent<SpinnerProps & CenteringProps> = ({ 
    zIndex,
    size = 'normal'
}) => {
    return (
        <div className={[styles.spinner, styles[size]].join(' ')} style={{ zIndex }} />
    )
}

export default withCentering(Spinner);