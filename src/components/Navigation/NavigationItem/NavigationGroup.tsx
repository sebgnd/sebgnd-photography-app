import { useCallback, useEffect, useState } from 'react';
import type { FunctionComponent, CSSProperties } from 'react';

import { NavigationItem } from './NavigationItem';

import styles from './styles/NavigationGroup.module.scss';
import { combineClasses } from 'libs/css/css';

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
	activeClassName?: string,
	onItemClick?: () => void,
};

export const NavigationGroup: FunctionComponent<NavigationGroupProps> = ({
	items,
	itemClassName, 
	justifyContent,
	activeClassName,
	onItemClick = () => {},
	className = '',
	direction = 'row',
}) => {
	const [activeIndex, setActiveIndex] = useState(-1);

	const makeOnClickHandler = useCallback((index: number, url?: string, additionnalOnClick = () => {}) => () => {
		if (url) {
			setActiveIndex(index);
		}

		additionnalOnClick();
		onItemClick();
	}, [onItemClick]);

	useEffect(() => {
		const activeItemIndex = items.findIndex((item) => {
			return item.url === window.location.pathname;
		});

		if (activeItemIndex !== -1) {
			setActiveIndex(activeItemIndex);
		} 
	}, [items]);

	return (
		<div
			className={`${styles.navigationGroup} ${className}`}
			style={{
				flexDirection: direction,
				justifyContent
			}}
		>
			{items.map(({ url, name, onClick }, index) => (
				<NavigationItem
					onClick={makeOnClickHandler(index, url, onClick)}
					className={combineClasses(
						itemClassName,
						index === activeIndex
							? activeClassName
							: undefined
					)}
					key={`NavigationGroup-${name}`}
					url={url}
					name={name}
				/>
			))}
		</div>
	)
}