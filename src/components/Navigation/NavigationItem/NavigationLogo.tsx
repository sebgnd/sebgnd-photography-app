import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import type { FunctionComponent } from 'react';

import { Svg, isValidSvgName } from 'components/UI/Content/Svg/Svg';
import { IconName } from 'components/UI/Content/Svg/icons';

import styles from './styles/NavigationLogo.module.scss';

export type NavigationLogoProps = {
  src: string;
  url: string;
}

export const NavigationLogo: FunctionComponent<NavigationLogoProps> = ({ src, url }) => {
  const isLogoSvg = useMemo(() => isValidSvgName(src), [src]);

  return (
    <Link className={styles.logo} to={url}>
      {isLogoSvg ? (
        <Svg name={src as IconName} size={50} />
      ) : (
        <img src={src} alt="logo" />
      )}
    </Link>
  );
};
