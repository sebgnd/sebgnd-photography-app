import { useEffect, useMemo } from 'react';
import type { FunctionComponent } from 'react';
import { io } from 'socket.io-client';

import { SebGndPhotographyRouter } from 'components/Router/SebGndPhotographyRouter';

import { Home as FrontOfficeHome } from 'pages/FrontOffice/Home/Home';
import { Galleries } from 'pages/FrontOffice/Galleries/Galleries';
import { Gallery } from 'pages/FrontOffice/Gallery/Gallery';
import { Recent } from 'pages/FrontOffice/Recent/Recent';

import { Home as BackOfficeHome } from 'pages/BackOffice/Home/Home';
import { GallerySettings } from 'pages/BackOffice/GallerySettings/GallerySettings';
import { Authentication } from 'pages/BackOffice/Authentication/Authentication';

import { UserLayout } from 'layouts/UserLayout';
import { AdminLayout } from 'layouts/AdminLayout';

import { SocketContext } from 'contexts/SocketContext';

export const App: FunctionComponent = () => {
	const socket = useMemo(() => {
		return io('localhost:8000')
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
						routes: {
							'index': <FrontOfficeHome />,
							'galleries': <Galleries />,
							'gallery/:id': <Gallery />,
							'recent': <Recent />
						},
					},
					// Outside of `admin` subrouter since this is un unrestricted route
					// and does not user the layout
					'admin/login': <Authentication />,
					'admin': {
						restricted: true,
						layout: <AdminLayout />,
						loginPath: '/admin/login',
						routes: {
							'home': <BackOfficeHome />,
							'gallery-settings': <GallerySettings />
						},
					},
				}}
			/>
		</SocketContext.Provider>
	);
}

export default App;