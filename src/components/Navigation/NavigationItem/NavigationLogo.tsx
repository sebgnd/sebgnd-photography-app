import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

export type NavigationLogoProps = {
  src: string;
  url: string;
}

export const NavigationLogo: FunctionComponent<NavigationLogoProps> = ({ src, url }) => {
  return (
    <Link to={url}>
      <img src={src} alt="logo" />
    </Link>
  );
};
