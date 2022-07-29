import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { FunctionComponent, CSSProperties } from 'react';

import { combineClasses } from 'libs/css/css';

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
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(-1);

  const makeOnClickHandler = useCallback((additionnalOnClick = () => {}) => () => {
    additionnalOnClick();
    onItemClick();
  }, [onItemClick]);

  useEffect(() => {
    const activeItemIndex = items.findIndex((item) => {
      return item.url === location.pathname;
    });

    if (activeItemIndex !== -1) {
      setActiveIndex(activeItemIndex);
    }
  }, [location, items]);

  return (
    <div
      className={`${styles.navigationGroup} ${className}`}
      style={{
        flexDirection: direction,
        justifyContent,
      }}
    >
      {items.map(({ url, name, onClick }, index) => (
        <NavigationItem
          onClick={makeOnClickHandler(onClick)}
          className={combineClasses(
            itemClassName,
            index === activeIndex ?
              activeClassName :
              undefined,
          )}
          key={`NavigationGroup-${name}`}
          url={url}
          name={name}
        />
      ))}
    </div>
  );
};
