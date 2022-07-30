import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import type { FunctionComponent } from 'react';

import { Svg, isValidSvgName } from 'components/UI/Content/Svg/Svg';
import { IconName } from 'components/UI/Content/Svg/icons';

export type NavigationLogoProps = {
  src: string;
  url: string;
}

export const NavigationLogo: FunctionComponent<NavigationLogoProps> = ({ src, url }) => {
  const isLogoSvg = useMemo(() => isValidSvgName(src), [src]);

  return (
    <Link to={url}>
      {isLogoSvg ? (
        <Svg name={src as IconName} size={50} />
      ) : (
        <img src={src} alt="logo" />
      )}
    </Link>
  );
};
