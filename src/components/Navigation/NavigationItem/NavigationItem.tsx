import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { Text } from 'components/UI/Content/Text/Text';

import userStyles from './UserNavigationItem.module.css';
import adminStyles from './AdminNavigationItem.module.css';

export interface INavItem {
  url: string;
  name: string;
} 

interface NavigationItemProps {
  name: string;
  url: string;
  type: 'admin' | 'user';
  onClick?: () => void;
}

const NavigationItem: FunctionComponent<NavigationItemProps> = ({ name, url, onClick, type }) => {
  const getStyles = () => {
    switch (type) {
      case 'admin': return adminStyles;
      case 'user': return userStyles;
      default: return userStyles;
    }
  }

  const styles = getStyles();

  return (
    <Link onClick={onClick} className={styles.navItem} to={url}>
      <Text text={name} />
    </Link>
  );
};

export default NavigationItem;
