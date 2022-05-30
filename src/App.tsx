import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { io } from 'socket.io-client';

import { Home as FrontOfficeHome } from 'pages/FrontOffice/Home/Home';
import { Galleries } from 'pages/FrontOffice/Galleries/Galleries';
import { Gallery } from 'pages/FrontOffice/Gallery/Gallery';
import { Recent } from 'pages/FrontOffice/Recent/Recent';

import { Home as BackOfficeHome } from 'pages/BackOffice/Home/Home';

import { UserLayout } from 'layouts/UserLayout';
import { AdminLayout } from 'layouts/AdminLayout';

import { SocketContext } from 'contexts/SocketContext';

import { fetchAllCategories } from 'redux/slices/gallery/gallery.thunk';

export const App: FunctionComponent = () => {
	const dispatch = useDispatch();

	const socket = useMemo(() => {
		return io('localhost:8000')
	}, []);

	useEffect(() => {
		dispatch(fetchAllCategories());
	}, [dispatch]);

	return (
		<SocketContext.Provider value={{ socket }}>
			<BrowserRouter>
				<Routes>
					<Route path="admin" element={<AdminLayout />}>
						<Route path="home" element={<BackOfficeHome />} />
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
	);
}

export default App;