import React, { FunctionComponent } from 'react';
import NavigationItem from '../../NavigationItem/NavigationItem';

import styles from './MobileNavigation.module.css';

interface MobileNavigationProps {
	opened: boolean;
	clicked: () => void;
}

const MobileNavigation: FunctionComponent<MobileNavigationProps> = ({ opened, clicked }) => {
	const mobileNav = opened ? `${styles.navigation} ${styles.mobile} ${styles.open}` : `${styles.navigation} ${styles.mobile} ${styles.close}`;

	return (
		<div className={mobileNav}>
			<NavigationItem type="user" onClick={clicked} name="Home" url="/" />
			<NavigationItem type="user" onClick={clicked} name="Galleries" url="/galleries" />
			<NavigationItem type="user" onClick={clicked} name="Recent" url="/recent" />
		</div>
	)
}

export default MobileNavigation;