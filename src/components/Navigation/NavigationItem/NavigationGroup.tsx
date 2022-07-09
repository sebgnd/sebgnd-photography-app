import React, { CSSProperties, useCallback } from 'react';
import type { FunctionComponent } from 'react';

import { NavigationItem } from './NavigationItem';

import styles from './styles/NavigationGroup.module.scss';

export type NavigationGroupProps = {
	items: ReadonlyArray<{
		name: string,
		url?: string,
		onClick?: () => void,
	}>,
	className?: string,
	justifyContent: CSSProperties['justifyContent'],
	direction?: 'row' | 'column',
	itemClassName?: string,
	onItemClick?: () => void,
};

export const NavigationGroup: FunctionComponent<NavigationGroupProps> = ({
	items,
	itemClassName, 
	justifyContent,
	onItemClick = () => {},
	className = '',
	direction = 'row',
}) => {
	const makeOnClickHandler = useCallback((additionnalOnClick = () => {}) => () => {
		additionnalOnClick();
		onItemClick();
	}, [onItemClick]);

	return (
		<div
			className={`${styles.navigationGroup} ${className}`}
			style={{
				flexDirection: direction,
				justifyContent
			}}
		>
			{items.map(({ url, name, onClick }) => (
				<NavigationItem
					onClick={makeOnClickHandler(onClick)}
					className={itemClassName}
					key={`NavigationGroup-${name}`}
					url={url}
					name={name}
				/>
			))}
		</div>
	)
}