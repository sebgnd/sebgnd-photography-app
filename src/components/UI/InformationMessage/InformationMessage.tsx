import React, { FunctionComponent, useMemo } from 'react';

import { Icon } from 'components/UI/Content/Icon/Icon';
import { Text } from 'components/UI/Content/Text/Text';

import styles from './InformationMessage.module.scss';

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

export const InformationMessage: FunctionComponent<InformationMessageProps> = ({ 
	message, 
	color, 
	messageType,
	size = 'medium',
	noIcon = false
}) => {
	const colorHex = useMemo(() => {
		switch (color) {
			case 'white': return '#FFFFFF';
			case 'black': return '#000000';
			default: return '#858585'
		}
	}, [color]);

	const contentSize = size === 'small' ? 'small' : 'regular';

	return (
		<div style={{ color: colorHex }} className={[styles.informationMessageContainer, styles[size]].join(' ')}>
			{!noIcon && (
				<Icon size={contentSize} name={icons[messageType]} />
			)}
			<Text
				className={styles.informationMessage}
				size={contentSize}
				type="p"
				text={message}
			/>
		</div>
	);
};
