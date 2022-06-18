import React, { useMemo, forwardRef } from 'react';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';

import styles from './ButtonContainer.module.scss';

export type ButtonVariant = 'classic' | 'light';
export type ButtonColor = 'default' | 'success' | 'destructive';
export type ButtonType = 'regular' | 'round';

export type ButtonContainerProps = {
	color: ButtonColor,
	variant: ButtonVariant,
	type: ButtonType,
	className?: string,
	disabled?: boolean,
	onClick: (event: MouseEvent) => void;
	style?: CSSProperties,
	children?: ReactNode,
}

export const ButtonContainer = forwardRef<HTMLButtonElement, ButtonContainerProps>(
	/**
	 * Use named function to keep `displayName` because `forwardRef` removes it
	 */
	function ButtonContainer({
		color,
		variant,
		type,
		disabled = false,
		className = '',
		style = {},
		children,
		onClick,
	}, ref) {
		const finalClassName = useMemo(() => {
			const classes = [
				styles.button,
				styles[variant],
				styles[type],
				styles[color],
				className,
			];

			return classes.join(' ');
		}, [variant, color, type, className]);

		return (
			<button
				ref={ref}
				disabled={disabled}
				className={finalClassName}
				style={style}
				onClick={onClick}
			>
				{children}
			</button>
		);
	}
);