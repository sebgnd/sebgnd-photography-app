import React, { FunctionComponent, MouseEvent, useMemo } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'classic' | 'light';
export type ButtonColor = 'default' | 'success' | 'destructive';

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
	const className = useMemo(() => {
		const classes = [
			styles.button,
			styles[variant],
			fullWidth ? styles.fullWidth : '',
			variant === 'classic' ? styles[color] : '',
		];

		return classes.join(' ');
	}, [fullWidth, variant, color]);

	return (
		<button 
			disabled={disabled}
			className={className}
			onClick={onClick}
			style={{
					backgroundColor: color
			}}
		>
			{label}
		</button>
	);
}
