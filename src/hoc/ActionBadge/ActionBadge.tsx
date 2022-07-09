import { FunctionComponent, MouseEvent, ReactNode, useCallback, useMemo } from 'react';

import { Icon } from 'components/UI/Content/Icon/Icon';

import styles from './ActionBadge.module.scss';

export type ActionBadgeProps = {
	iconName: string;
	onBadgeClick?: (event: MouseEvent<HTMLDivElement>) => void,
	children: ReactNode,
	visible?: boolean,
	backgroundColor?: string;
	iconColor?: string;
}

export const ActionBadge: FunctionComponent<ActionBadgeProps> = ({
	iconName,
	onBadgeClick,
	children,
	visible = true,
	backgroundColor = 'rgb(218 218 218)',
	iconColor = 'black',
}) => {
	const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
		if (onBadgeClick) {
			onBadgeClick(event);
		}
	}, [onBadgeClick]);

	const className = useMemo(() => {
		if (onBadgeClick) {
			return [
				styles.componentContainer,
				styles.clickable
			].join(' ');
		}

		return styles.componentContainer;
	}, [onBadgeClick])

	return (
		<div className={className}>
			{children}
			{visible && (
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
			)}
		</div>
	)
};
