import React, { FunctionComponent } from 'react';

import withCentering, { CenteringProps } from '../../../hoc/withCentering';

import styles from './InformationMessage.module.css';

interface InformationMessageProps {
	message: string;
	messageType: 'error' | 'information';
	color?: 'default' | 'white' | 'black';
	size?: 'small' | 'medium';
	noIcon?: boolean;
}

interface IconMap {
	[key: string]: string;
}

const icons: IconMap = {
	error: 'exclamation-circle',
	information: 'info-circle'
};

const InformationMessageWithoutCentering: FunctionComponent<InformationMessageProps & CenteringProps> = ({ 
    message, 
    color, 
    messageType,
    size = 'medium',
    noIcon = false
}) => {
    const getColor = () => {
			switch (color) {
				case 'white': return '#FFFFFF';
				case 'black': return '#000000';
				default: return '#858585'
			}
    };

    return (
			<div style={{ color: getColor() }} className={[styles.informationMessageContainer, styles[size]].join(' ')}>
				{!noIcon && (
					<i className={`fas fa-${icons[messageType]}`} />
				)}
				<p>{message}</p>
			</div>
    );
};

export const InformationMessage = withCentering(InformationMessageWithoutCentering);