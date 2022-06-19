import React, { FunctionComponent, MouseEvent, ReactNode, useCallback } from 'react';

import { Icon } from 'components/UI/Content/Icon/Icon';

import styles from './ActionBadge.module.scss';

export type ActionBadgeProps = {
	iconName: string;
	onBadgeClick: (event: MouseEvent<HTMLDivElement>) => void,
	children: ReactNode,
	backgroundColor?: string;
	iconColor?: string;
}

export const ActionBadge: FunctionComponent<ActionBadgeProps> = ({
	iconName,
	onBadgeClick,
	children,
	backgroundColor = 'rgb(218 218 218)',
	iconColor = 'black',
}) => {
	const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
		if (onBadgeClick) {
			onBadgeClick(event);
		}
	}, [onBadgeClick]);

	return (
		<div className={styles.componentContainer}>
			{children}
			<div className={styles.badge}>
				<div 
					style={{ backgroundColor }} 
					className={styles.iconContainer} 
					onClick={handleClick}
				>
					<div style={{ color: iconColor }}>
						<Icon name={iconName} />
					</div>
				</div>
			</div>
		</div>
	)
};
