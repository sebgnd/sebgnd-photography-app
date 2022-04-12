import React, { FunctionComponent, MouseEvent } from 'react';
import styles from './Button.module.css';

interface ButtonProp {
    onClick?: (event: MouseEvent) => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'classic' | 'light';
    size?: 'medium' | 'small' | 'big';
    disabled?: boolean;
    label: string;
    color?: string;
    to?: string;
    fullWidth?: boolean;
}

export const Button: FunctionComponent<ButtonProp> = ({ 
    variant = 'classic', 
    size = 'medium', 
    label, 
    type, 
    color = 'white',
    fullWidth,
    disabled,
    onClick, 
}) => {
    const getClassName = () => {
        const classes = [styles.button, styles[size], styles[variant]];
        if (fullWidth) {
            classes.push(styles.fullWidth);
        }
        return classes.join(' ');
    }

    return (
        <button 
            disabled={disabled}
            className={getClassName()}
            onClick={onClick}
            type={type}
            style={{
                backgroundColor: color
            }}
        >
            {label}
        </button>
    )
}
