import { useMemo, forwardRef } from 'react';
import type {
	CSSProperties,
	MouseEvent,
	ReactNode,
	FunctionComponent,
	DetailedHTMLProps,
	PropsWithChildren,
	ButtonHTMLAttributes,
} from 'react';

import { combineClasses } from 'libs/css/css';

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
};

type BaseButtonProps = PropsWithChildren<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>;

export const BaseButtonContainer: FunctionComponent<BaseButtonProps> = ({ children, className, ...props }) => {
	return ( 
		<button
			className={combineClasses(styles.baseButton, className)}
			{...props }
		>
			{children}
		</button>
	)
};

export const ButtonContainer = forwardRef<HTMLButtonElement, ButtonContainerProps>(
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
			<BaseButtonContainer
				ref={ref}
				disabled={disabled}
				className={finalClassName}
				style={style}
				onClick={onClick}
			>
				{children}
			</BaseButtonContainer>
		);
	}
);