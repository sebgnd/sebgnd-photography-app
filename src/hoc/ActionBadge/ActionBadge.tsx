import { FunctionComponent, MouseEvent, ReactNode, useCallback, useMemo } from 'react';

import { Icon } from 'components/UI/Content/Icon/Icon';

import styles from './ActionBadge.module.scss';
import { combineClasses } from 'libs/css/css';

export type ActionBadgeVariant = 'success' | 'danger' | 'default';
export type ActionBadgeProps = {
	iconName: string;
	onBadgeClick?: (event: MouseEvent<HTMLDivElement>) => void,
	children: ReactNode,
	visible?: boolean,
	variant?: ActionBadgeVariant,
	backgroundColor?: string;
	iconColor?: string;
}

export const ActionBadge: FunctionComponent<ActionBadgeProps> = ({
	iconName,
	onBadgeClick,
	children,
	visible = true,
	variant = 'default',
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
						className={combineClasses(
							styles.iconContainer,
							styles[variant],
						)} 
						onClick={handleClick}
					>
						<Icon name={iconName} />
					</div>
				</div>
			)}
		</div>
	)
};
