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

import './styling/style.scss';

export const App: FunctionComponent = () => {
	const socket = useMemo(() => {
		if (!process.env.REACT_APP_SOCKET) {
			throw new Error('Socket URL not set (REACT_APP_SOCKET)')
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
						routes: {
							'index': { name: 'Home', element: <FrontOfficeHome /> },
							'galleries': { element: <Galleries />, name: 'Galleries' },
							'gallery/:id': { element: <Gallery /> },
							'recent': { element: <Recent />, name: 'Recent' },
						},
					},
					'admin': {
						restricted: true,
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
}

export default App;