import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { combineClasses } from 'libs/css/css';

import { Text } from 'components/UI/Content/Text/Text';

import styles from './styles/NavigationItem.module.scss';

export type NavigationItemProps = {
  name: string;
  url?: string;
	onClick?: () => void,
  className?: string,
}

export const NavigationItem: FunctionComponent<NavigationItemProps> = ({ name, url, className, onClick }) => {
	if (url) {
		return (
			<Link onClick={onClick} className={className} to={url}>
				<Text text={name} />
			</Link>
		);
	}

  return (
    <div onClick={onClick} className={combineClasses(className, styles.clickable)}>
      <Text text={name} />
    </div>
  );
};
