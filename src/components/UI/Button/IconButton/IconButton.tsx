import React, { FunctionComponent, MouseEvent } from 'react';

import { Icon } from 'components/UI/Content/Icon/Icon';
import { ButtonContainer, ButtonVariant, ButtonColor } from 'components/UI/Button';

import styles from './IconButton.module.scss';

interface IconButtonProp {
	onClick: (event: MouseEvent) => void;
	variant: ButtonVariant,
	color: ButtonColor,
	icon: string;
	disabled?: boolean;
}


export const IconButton: FunctionComponent<IconButtonProp> = ({ 
	onClick, 
	icon, 
	disabled = false,
	variant,
	color, 
}) => {
    return (
			<ButtonContainer
				type="round"
				disabled={disabled}
				variant={variant}
				color={color}
				onClick={onClick}
			>
				<div className={styles.contentContainer}>
					<div className={styles.content}>
						<Icon name={icon} />
					</div>
				</div>
			</ButtonContainer>
    );
};

