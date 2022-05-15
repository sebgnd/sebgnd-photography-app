import React, { FunctionComponent } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './Backdrop.module.css';

export type BackdropProps = {
	show: boolean;
	zIndex?: number;
	onClick?: () => void;
}

export const Backdrop: FunctionComponent<BackdropProps> = ({ show, zIndex, onClick }) => {
	return (
		<>
			<CSSTransition
				in={show}
				classNames={{
						enterActive: styles.backdropEnterActive,
						exitActive: styles.backdropExitActive,
						enter: styles.backdropEnter,
						exit: styles.backdropExit
				}}
				timeout={150}
				unmountOnExit
				mountOnEnter
			>
				<div className={styles.backdrop} style={{ zIndex }} onClick={onClick} />
			</CSSTransition>
		</>
	)
}
