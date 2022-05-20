import React, { FunctionComponent, MouseEvent } from 'react';

import { Icon } from 'components/UI/Icon/Icon';

import styles from './RoundButton.module.css';

interface RoundButtonProp {
	onClick?: (event: MouseEvent) => void;
	size?: 'small' | 'medium';
	icon?: string;
	label?: string;
	disabled?: boolean;
	hoverStyle?: 'scale' | 'bgColor';
	active?: boolean;
}


export const RoundButton: FunctionComponent<RoundButtonProp> = ({ 
	onClick, 
	icon, 
	disabled = false, 
	label,
	size = 'medium',
	hoverStyle = 'scale',
	active
}) => {
	const getClassName = () => {
		const classes = [styles.roundButton, styles[size], styles[hoverStyle]];
		if (active) {
				classes.push(styles.active);
		}
		return classes.join(' ');
	}

    return (
			<button 
				disabled={disabled} 
				className={getClassName()} 
				onClick={onClick}
			>
				<div className={styles.contentContainer}>
					<div className={styles.content}>
						{(!label && icon) && (
								<Icon name={icon} />
						)}
						{(!icon && label) && (
								<p>{label}</p>
						)}
					</div>
				</div>
			</button>
    );
};

