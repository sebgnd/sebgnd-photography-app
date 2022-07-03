import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { io } from 'socket.io-client';

import { useAppDispatch } from 'redux/store';

import { RestrictedRoute } from 'components/Authentication/RestrictedRoute';

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

import { fetchAllCategories } from 'redux/slices/gallery/gallery.thunk';

export const App: FunctionComponent = () => {
	const dispatch = useAppDispatch();

	const socket = useMemo(() => {
		return io('localhost:8000')
	}, []);

	useEffect(() => {
		dispatch(fetchAllCategories());
	}, [dispatch]);

	return (
		<React.StrictMode>
			<SocketContext.Provider value={{ socket }}>
				<BrowserRouter>
					<Routes>
						<Route path="admin/login" element={<Authentication />} />
						<Route
							path="admin"
							element={
								<RestrictedRoute fallback="/admin/login">
									<AdminLayout />
								</RestrictedRoute>
							}
						>
							<Route path="home" element={<BackOfficeHome />} />
							<Route path="gallery-settings" element={<GallerySettings />} />
						</Route>
						<Route path="*" element={<UserLayout />}>
							<Route index element={<FrontOfficeHome />} />
							<Route path="galleries" element={<Galleries />} />
							<Route path="gallery/:id" element={<Gallery />} />
							<Route path="recent" element={<Recent />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</SocketContext.Provider>
		</React.StrictMode>
	);
}

export default App;