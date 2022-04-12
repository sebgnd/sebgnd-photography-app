import React, { FunctionComponent, MouseEvent } from 'react';
import styles from './RoundButton.module.css';

interface RoundButtonProp {
    onClick?: (event: MouseEvent) => void;
    size?: 'small' | 'medium';
    icon?: string;
    label?: string;
    disabled?: boolean;
    isBranding?: boolean;
    to?: string;
    hoverStyle?: 'scale' | 'bgColor';
    active?: boolean;
}


export const RoundButton: FunctionComponent<RoundButtonProp> = ({ 
    onClick, 
    icon, 
    disabled = false, 
    isBranding = false,
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
                        <i className={`${isBranding ? 'fab' : 'fas'} fa-${icon}`} />
                    )}
                    {(!icon && label) && (
                        <p>{label}</p>
                    )}
                </div>
            </div>
        </button>
    )
}
