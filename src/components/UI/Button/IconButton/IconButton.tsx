import React, { FunctionComponent, MouseEvent } from 'react';

import { ButtonContainer } from 'components/Styled/container';
import { Icon } from 'components/UI/Icon/Icon';

import styles from './IconButton.module.css';

interface IconButtonProp {
	onClick?: (event: MouseEvent) => void;
	icon: string;
	color?: string;
	size?: 'small' | 'medium' | 'big'; 
	disabled?: boolean;
}

export const IconButton: FunctionComponent<IconButtonProp> = ({ 
	onClick, 
	icon, 
	disabled = false, 
	color = 'black',
	size = 'medium'
}) => {
	const handleClick = (event: MouseEvent) => {
		if (onClick) {
			onClick(event);
		}
	}

	return (
		<ButtonContainer 
			disabled={disabled} 
			className={styles.iconButton} 
			onClick={(event) => handleClick(event)}
			style={{ color }}
		>
			<div className={[styles.icon, size].join(' ')}>
				<Icon name={icon} />
			</div>
		</ButtonContainer>
	);
};
