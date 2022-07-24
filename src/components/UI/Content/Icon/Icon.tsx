import { CSSProperties, FunctionComponent, useMemo } from 'react'

import { ContentSize } from '../types';
import { contentSizes } from '../constant';

import styles from './Icon.module.scss';
import { combineClasses } from 'libs/css/css';

export type IconVariant = 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'brands';
export type IconColor = 'default';
export type IconProps = {
  name: string,
  size?: ContentSize
  variant?: IconVariant,
	color?: IconColor,
};

export const Icon: FunctionComponent<IconProps> = ({
  name,
  size = 'regular',
  variant = 'solid',
	color,
}) => {
	const className = useMemo(() => combineClasses(
		`fa-${variant}`,
		`fa-${name}`,
		styles.icon,
		color
			? styles[color]
			: undefined,
	),[
		variant,
		name,
		color,
	]);

  const style: CSSProperties = {
    fontSize: contentSizes[size],
    verticalAlign: 'middle',
  };

  return (
    <div style={style} className={className} />
  );
};
