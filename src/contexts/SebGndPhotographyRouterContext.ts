import React from 'react';

import { IconName } from 'components/UI/Content/Svg/icons';

export type RouteInfo = {
  loginRoute?: string,
  logo: string | IconName,
  routes: Array<{
    url: string,
    index: boolean,
    name?: string,
  }>,
};

export type SebGndPhotographyRouterContextType = {
  routes: {
    [path: string]: RouteInfo,
  },
};

export const SebGndPhotographyRouterContext = React.createContext<SebGndPhotographyRouterContextType>({
  routes: {},
});
