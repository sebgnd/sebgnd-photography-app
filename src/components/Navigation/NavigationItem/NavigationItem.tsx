import React, { CSSProperties, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { Text } from 'components/UI/Content/Text/Text';

export interface INavItem {
  url: string;
  name: string;
} 

export type NavigationItemProps = {
  name: string;
  url: string;
  className?: string,
	style?: CSSProperties,
	onClick?: () => void,
}

const NavigationItem: FunctionComponent<NavigationItemProps> = ({ name, url, className, style, onClick }) => {
  return (
    <Link onClick={onClick} className={className} to={url}>
      <Text text={name} />
    </Link>
  );
};

export default NavigationItem;
