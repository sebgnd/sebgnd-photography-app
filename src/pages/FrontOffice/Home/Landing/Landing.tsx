import React, { FunctionComponent } from 'react';

import { Button } from '../../../../components/UI/Button';

import styles from './Landing.module.css';

export const Landing: FunctionComponent = () => {
    return (
        <div className={styles.landingContainer}>
            <div className={styles.landingButtonContainer}>
                <Button variant="classic" size="medium" label="See this photo" onClick={() => {}} />
            </div>
        </div>
    );
};
