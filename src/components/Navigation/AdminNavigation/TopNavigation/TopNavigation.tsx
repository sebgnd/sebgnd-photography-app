import React, { FunctionComponent } from 'react';

import NavigationItem, { INavItem } from '../../NavigationItem/NavigationItem';

import AdminLogo from './AdminLogo/AdminLogo';
import MoreNavigation from './MoreNavigation/MoreNavigation';

import styles from './TopNavigation.module.scss';

interface TopNavigationProps {
  moreItems: INavItem[];
  normalItems: INavItem[];
  onMoreClick: () => void;
  isMoreOpen: boolean;
}

const TopNavigation: FunctionComponent<TopNavigationProps> = ({ normalItems, moreItems, isMoreOpen, onMoreClick }) => {
  return (
    <div className={styles.topNavigation}>
      <div className={styles.adminLogo}>
        <AdminLogo
          imgSrc="/images/logo.png"
          imgAlt="logo"
          text="Administration Panel"
          textUrl="/admin/home"
          imgUrl="/"
        />
      </div>
      <div className={styles.navigationItems}>
        <div className={styles.normalNavigation}>
          {normalItems.map(item => (
            <NavigationItem
              key={item.url}
              url={item.url}
              name={item.name}
              type="admin"
            />
          ))}
        </div>
        <MoreNavigation 
          normalItems={normalItems} 
          moreItems={moreItems} 
          onClick={onMoreClick}
          isOpen={isMoreOpen}
        />
      </div>
    </div>
  )
}

export default TopNavigation