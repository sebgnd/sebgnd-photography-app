import React, { FunctionComponent, useRef, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useEventListener } from 'hooks';

import { INavItem } from 'components/Navigation/NavigationItem/NavigationItem';
import { ButtonContainer } from 'components/Styled/container';
import { Text } from 'components/UI/Content/Text/Text';
import { Icon } from 'components/UI/Content/Icon/Icon';

import MoreItem from './MoreItem/MoreItem';

import styles from './MoreNavigation.module.scss';

interface MoreProps {
  moreItems: INavItem[];
  normalItems: INavItem[];
  onClick: () => void;
  isOpen: boolean;
}

const MoreNavigation: FunctionComponent<MoreProps> = ({ moreItems, normalItems, isOpen, onClick }) => {
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  const getArrowClassName = () => {
    return [
      styles.arrow,
      isOpen
        ? styles.arrowUp
        : styles.arrowDown
    ].join(' ');
  }

  const handleClickOutside = useCallback((event: Event) => {
    if (moreMenuRef.current && moreButtonRef.current) {
      const outsideMenu = !moreMenuRef.current.contains(event.target as Node);
      const outsideButton = !moreButtonRef.current.contains(event.target as Node);

      if (outsideButton && outsideMenu) {
        setTimeout(() => {
          onClick();
        }, 50)
      }
    }
  }, [onClick]);    
  
  useEventListener('mousedown', handleClickOutside);

  return (
    <div className={styles.moreNavigation}>
      <ButtonContainer ref={moreButtonRef} onClick={onClick}>
        <div className={styles.moreButton}>
          <Text text="More" />
          <div className={getArrowClassName()}>
            <Icon name="chevron-down" />
          </div>
        </div>
      </ButtonContainer>
      <CSSTransition
        in={isOpen}
        classNames={{
            enterActive: styles.moreEnterActive,
            exitActive: styles.moreExitActive,
            enter: styles.moreEnter,
            exit: styles.moreExit
        }}
        timeout={500}
        unmountOnExit
        mountOnEnter
      >
        <div ref={moreMenuRef} className={styles.moreItemsList}>
          <div className={styles.normalItems}>
            {normalItems.map(item => (
              <MoreItem key={item.url} onClick={onClick} name={item.name} url={item.url} />
            ))}
          </div>
          {moreItems.map(item => (
            <MoreItem key={item.url} onClick={onClick} name={item.name} url={item.url} />
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};

export default MoreNavigation;