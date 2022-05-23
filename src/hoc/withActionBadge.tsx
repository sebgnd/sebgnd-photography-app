import React, { ComponentType, FunctionComponent, MouseEvent, useCallback } from 'react';

import { Icon } from 'components/UI/Content/Icon/Icon';

import styles from './css/badge.module.css';

export type WithActionBadgeProps = {
	onBadgeClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export type IconSetting = {
	name: string;
};

export type BadgeStyle = {
	backgroundColor?: string;
	iconColor?: string;
}

const withActionBadge = <P extends object>(WrappedComponent: ComponentType<P>, icon: IconSetting, style: BadgeStyle = {}) => {
const ComponentWithActionBadge: FunctionComponent<P & WithActionBadgeProps> = (props: P & WithActionBadgeProps) => {
		const { onBadgeClick } = props;

		const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
			if (onBadgeClick) {
				onBadgeClick(event);
			}
		}, [onBadgeClick]);

		return (
			<div className={styles.componentContainer}>
				<WrappedComponent {...props} />
				<div className={styles.badge}>
					<div 
						style={{ backgroundColor: style?.backgroundColor || 'rgb(218 218 218)' }} 
						className={styles.iconContainer} 
						onClick={handleClick}
					>
						<div style={{ color: style?.backgroundColor || 'black' }}>
							<Icon name={icon.name} />
						</div>
					</div>
				</div>
			</div>
		)
	}

return ComponentWithActionBadge;
}

export default withActionBadge;