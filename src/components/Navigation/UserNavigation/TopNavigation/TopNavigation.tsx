import React, { FunctionComponent } from 'react';
import NavigationItem from '../../NavigationItem/NavigationItem';
import HamburgerButton from './HamburgerButton/HamburgerButton';
import Logo from './NavigationLogo/Logo';

import styles from './TopNavigation.module.css';

interface TopNavigationProps {
    onToggleMobile(): void;
}

const TopNavigation: FunctionComponent<TopNavigationProps> = ({ onToggleMobile }) => {
    return (
        <div className={styles.top}>
            <HamburgerButton onClick={onToggleMobile} />
            <div className={styles.sideMenu}>
                <NavigationItem type="user" name="Home" url="/" />
                <NavigationItem type="user" name="Galleries" url="/galleries" />
            </div>
            <Logo imgSrc="/images/logo.png" imgAlt="logo" url="/" />
            <div className={styles.sideMenu}>
                <NavigationItem type="user" name="Recent" url="/recent" />
                <NavigationItem type="user" name="Contact" url="/contact" />
            </div>
        </div>
    )
}

export default TopNavigation;