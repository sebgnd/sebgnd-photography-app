import { useRef, useMemo } from 'react';
import type { FunctionComponent, CSSProperties, ReactNode } from 'react';

import styles from './WipeAnimation.module.scss';

export type WipeAnimationProps = {
  duration?: number,
  visible: boolean,
  children: ReactNode,
};

export const WipeAnimation: FunctionComponent<WipeAnimationProps> = ({
  duration = 500,
  visible,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const animationStyle = useMemo((): CSSProperties => {
    if (!ref.current) {
      return { width: 0 };
    }

    const dummyComponentWidth = ref.current.clientWidth;

    return {
      transitionProperty: 'width',
      transitionDuration: `${duration}ms`,
      width: visible ? dummyComponentWidth : 0,
    };
  }, [visible, duration]);

  return (
    <>
      <div style={animationStyle}>
        {children}
      </div>
      <div style={{ zIndex: -1, position: 'fixed' }}>
        <div
          ref={ref}
          className={styles.dummyContainer}
        >
          {children}
        </div>
      </div>
    </>
  );
};
