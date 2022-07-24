import React from 'react';
import type { FunctionComponent, MouseEvent } from 'react';

import { Text } from 'components/UI/Content/Text/Text';
import { ButtonContainer, ButtonVariant, ButtonColor } from 'components/UI/Button';

import styles from './Button.module.scss';

export type ButtonProp = {
	onClick: (event: MouseEvent) => void;
	label: string;
	disabled?: boolean;
	fullWidth?: boolean;
	color?: ButtonColor;
	variant?: ButtonVariant;
}


export const Button: FunctionComponent<ButtonProp> = ({ 
	label,
	onClick, 
	disabled = false,
	fullWidth = false,
	color = 'default',
	variant = 'classic', 
}) => {
	return (
		<ButtonContainer
			type="regular"
			variant={variant}
			color={color}
			disabled={disabled}
			className={fullWidth ? styles.fullWidth : ''}
			onClick={onClick}
		>
			<Text text={label} />
		</ButtonContainer>
	);
}
