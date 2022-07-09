import React, { CSSProperties } from 'react';
import type { FunctionComponent } from 'react';

import NavigationItem from './NavigationItem';

import styles from './styles/NavigationGroup.module.scss';

export type NavigationGroupProps = {
	items: ReadonlyArray<{
		name: string,
		url: string,
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
	onItemClick,
	className = '',
	direction = 'row',
}) => {
	return (
		<div
			className={`${styles.navigationGroup} ${className}`}
			style={{
				flexDirection: direction,
				justifyContent
			}}
		>
			{items.map(({ url, name }) => (
				<NavigationItem
					onClick={onItemClick}
					className={itemClassName}
					key={`NavigationGroup-${name}`}
					url={url}
					name={name}
				/>
			))}
		</div>
	)
}