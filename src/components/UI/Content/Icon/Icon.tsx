import { CSSProperties, FunctionComponent, useMemo } from 'react'

import { ContentSize } from '../types';
import { contentSizes } from '../constant';

import styles from './Icon.module.scss';

export type IconVariant = 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'brands';
export type IconProps = {
  name: string,
  size?: ContentSize
  variant?: IconVariant,
};

export const Icon: FunctionComponent<IconProps> = ({
  name,
  size = 'regular',
  variant = 'solid',
}) => {
  const className = useMemo(() => {
    return `fa-${variant} fa-${name} ${styles.icon}`;
  }, [variant, name]);

  const style: CSSProperties = {
    fontSize: contentSizes[size],
    verticalAlign: 'middle',
  };

  return (
    <div style={style} className={className} />
  );
};
