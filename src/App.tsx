import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Home } from 'pages/FrontOffice/Home/Home';
import { Galleries } from 'pages/FrontOffice/Galleries/Galleries';
import { Gallery } from 'pages/FrontOffice/Gallery/Gallery';
import { Recent } from 'pages/FrontOffice/Recent/Recent';

import { UserLayout } from 'layouts/UserLayout';

import { fetchAllCategories } from 'redux/slices/gallery/gallery.thunk';

export const App: FunctionComponent = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllCategories());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<UserLayout>
				<Routes>
					<Route index element={<Home />} />
					<Route path="galleries" element={<Galleries />} />
					<Route path="gallery/:id" element={<Gallery />} />
					<Route path="recent" element={<Recent />} />
				</Routes>
			</UserLayout>
		</BrowserRouter>
	);
}

export default App;