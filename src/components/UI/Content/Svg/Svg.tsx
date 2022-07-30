import { FunctionComponent } from 'react';

import { icons, IconName } from './icons';

export type SvgProps = {
  name: IconName,
  size?: number | string,
};

export const isValidSvgName = (name: string): name is IconName => {
  return Object.keys(icons).includes(name);
};

export const Svg: FunctionComponent<SvgProps> = ({ name, size = 80 }) => {
  const icon = icons[name];

  return (
    <svg width={size} height={size} viewBox={icon.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      {icon.svg}
    </svg>
  );
};
