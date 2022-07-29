import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthenticated } from 'hooks';

import { SilentTokenRefresh } from './SilentTokenRefresh';

import type { FunctionComponent, PropsWithChildren } from 'react';

export type RestrictedRouteProps = PropsWithChildren & {
  fallback: string,
}

export const RestrictedRoute: FunctionComponent<RestrictedRouteProps> = ({ children, fallback }) => {
  const isAuthenticated = useAuthenticated();

  return (
    <SilentTokenRefresh>
      {isAuthenticated && (
        <>{children}</>
      )}
      {!isAuthenticated && (
        <Navigate to={fallback} />
      )}
    </SilentTokenRefresh>
  );
};
