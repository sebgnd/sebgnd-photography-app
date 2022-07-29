import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { selectUserToken } from 'redux/slices/user/user.selector';

export const useAuthenticated = () => {
  const token = useSelector(selectUserToken);

  const isAuthenticated = useMemo(() => {
    if (!token) {
      return false;
    }

    const decoded = jwt.decode(token) as JwtPayload;
    const now = new Date();
    const expirationDate = new Date(decoded.exp! * 1000);

    return now.getTime() < expirationDate.getTime();
  }, [token]);

  return isAuthenticated;
};
