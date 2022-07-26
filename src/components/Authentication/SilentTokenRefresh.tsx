import { useEffect, useState } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';

import { useAppDispatch } from 'redux/store';
import { useAuthenticated } from 'hooks';

import { Centered } from 'hoc/Centered/Centered';

import { Spinner } from 'components/UI/Spinner/Spinner';

import { refreshToken } from 'redux/slices/user/user.thunk';

export const SilentTokenRefresh: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAuthenticated();
  const [refreshingToken, setRefreshingToken] = useState(true);

  useEffect(() => {
    const refreshAuthorizationToken = async () => {
      if (!isAuthenticated) {
        await dispatch(refreshToken());
      }

      setRefreshingToken(false);
    };

    refreshAuthorizationToken();
  }, [isAuthenticated, dispatch]);

  if (refreshingToken) {
    return (
      <Centered
        centerHorizontal
        centerVertical
        fullScreen
      >
        <Spinner size="normal" />
      </Centered>
    );
  }

  return (
    <>{children}</>
  );
};
