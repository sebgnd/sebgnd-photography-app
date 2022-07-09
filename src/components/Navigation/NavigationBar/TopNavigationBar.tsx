import React, { useState, useCallback, useMemo, useRef, useEffect, CSSProperties } from 'react';
import type { FunctionComponent } from 'react';

import { combineClasses } from 'libs/css/css';

import { useEventListener } from 'hooks';

import type {
	NavigationBarItem,
	NavigationLogoItem,
	NavigationBarClassNames,
} from './NavigationBar.type';

import { Backdrop } from 'components/UI/Backdrop/Backdrop';

import { NavigationLogo } from '../NavigationItem/NavigationLogo';
import { NavigationGroup } from '../NavigationItem/NavigationGroup';
import { NavigationHamburger } from '../NavigationItem/NavigationHamburger';

import styles from './TopNavigationBar.module.scss';

export type TopNavigationBarProps = {
	height: number,
	logo: NavigationLogoItem,
	maxPixelForMobile?: number,
	items: NavigationBarItem[],
	classNames: NavigationBarClassNames,
}

export const TopNavigationBar: FunctionComponent<TopNavigationBarProps> = ({
	logo,
	items,
	height,
	classNames,
	maxPixelForMobile,
}) => {
	const mobileNavigationRef = useRef<HTMLDivElement | null>(null);

	const [navContainerStyle, setNavContainerStyle] = useState<CSSProperties>({ height });
	const [mobileNavigationStyle, setMobileNavigationStyle] = useState<CSSProperties>({
		transform: 'translateY(-100%)'
	});

	const [mobileNavActive, setMobileNavActive] = useState(() => (
		maxPixelForMobile
			? window.innerWidth < maxPixelForMobile
			: false
	));
	const [mobileNavOpened, setMobileNavOpened] = useState(false);

	useEventListener('resize', useCallback(() => {
		const { innerWidth } = window;

		if (!maxPixelForMobile) {
			return;
		}

		if (innerWidth <= maxPixelForMobile) {
			setMobileNavActive(true);
		} else {
			setMobileNavActive(false);
			setMobileNavOpened(false);
		}
	}, [maxPixelForMobile]));

	const toggleMobileNavigation = useCallback(() => {
		setMobileNavOpened((prev) => !prev);
	}, []);

	const layoutClassName = useMemo(() => combineClasses(
		styles.navigationLayout,
		classNames.layout,
	), [
		classNames.layout
	]);

	const containerClassName = useMemo(() => combineClasses(
		styles.navigationContainer,
		classNames.container,
	), [
		classNames.container
	])

	useEffect(() => {
		const newMobileNavigationStyle = mobileNavOpened
			? { transform: `translateY(${height}px)` }
			: { transform: `translateY(calc(-100% + ${height}px))` };

		const newNavContainerStyle = mobileNavOpened
			? { height: height + (mobileNavigationRef.current?.clientHeight || 0) }
			: { height };
		
		setNavContainerStyle(newNavContainerStyle);
		setMobileNavigationStyle(newMobileNavigationStyle);
	}, [height, mobileNavOpened])

	return (
		<>
			<nav>
				<div
					className={containerClassName}
					style={navContainerStyle}
				>
					<div
						className={layoutClassName}
						style={{ height }}
					>
						<NavigationLogo
							src={logo.src}
							url={logo.url}
						/>
						{!mobileNavActive && (
							<>
								<NavigationGroup
									items={items}
									justifyContent="right"
									itemClassName={styles.desktopItem}
								/>
							</>
						)}
						{mobileNavActive && (
							<div className={styles.hamburgerContainer}>
								<NavigationHamburger onClick={toggleMobileNavigation} />
							</div>
						)}
					</div>
					{mobileNavActive && (
						<div
							ref={mobileNavigationRef}
							className={styles.mobileContainer}
							style={mobileNavigationStyle}
						>
							<NavigationGroup
								onItemClick={toggleMobileNavigation}
								items={items}
								direction="column"
								justifyContent="center"
								itemClassName={styles.mobileItem}
							/>
						</div>
					)}
				</div>
			</nav>
			<Backdrop
				zIndex={490}
				show={mobileNavOpened}
				onClick={toggleMobileNavigation}
			/>
		</>
	)
};
