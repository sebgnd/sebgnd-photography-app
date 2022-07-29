import { useEffect, useMemo } from 'react';
import type { FunctionComponent } from 'react';
import { io } from 'socket.io-client';

import { SebGndPhotographyRouter } from 'components/Router/SebGndPhotographyRouter';

import { Home as FrontOfficeHome } from 'scopes/user/Home/Home';
import { Galleries } from 'scopes/user/Galleries/Galleries';
import { Gallery } from 'scopes/user/Gallery/Gallery';
import { Recent } from 'scopes/user/Recent/Recent';

import { Home as BackOfficeHome } from 'scopes/admin/Home/Home';
import { GallerySettings } from 'scopes/admin/GallerySettings/GallerySettings';
import { Authentication } from 'scopes/admin/Authentication/Authentication';

import { UserLayout } from 'scopes/user/UserLayout';
import { AdminLayout } from 'scopes/admin/AdminLayout';

import { SocketContext } from 'contexts/SocketContext';

import './styling/style.scss';

export const App: FunctionComponent = () => {
  const socket = useMemo(() => {
    if (!process.env.REACT_APP_SOCKET) {
      throw new Error('Socket URL not set (REACT_APP_SOCKET)');
    }

    return io(process.env.REACT_APP_SOCKET);
  }, []);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      <SebGndPhotographyRouter
        router={{
          'index': {
            restricted: false,
            layout: <UserLayout />,
            logo: '/images/logo.png',
            routes: {
              'index': { name: 'Home', element: <FrontOfficeHome /> },
              'galleries': { element: <Galleries />, name: 'Galleries' },
              'gallery/:id': { element: <Gallery /> },
              'recent': { element: <Recent />, name: 'Recent' },
            },
          },
          'admin': {
            restricted: true,
            logo: '/images/logo.png',
            layout: <AdminLayout />,
            login: {
              path: 'login',
              element: <Authentication />,
            },
            routes: {
              'home': {
                name: 'Home',
                index: true,
                element: <BackOfficeHome />,
              },
              'gallery-settings': { element: <GallerySettings />, name: 'Gallery settings' },
            },
          },
        }}
      />
    </SocketContext.Provider>
  );
};

export default App;
