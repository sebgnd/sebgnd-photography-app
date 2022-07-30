import { Navigate } from 'react-router-dom';

import type { FunctionComponent } from 'react';

export const NotFound: FunctionComponent = () => (
  <Navigate to="/" />
);
