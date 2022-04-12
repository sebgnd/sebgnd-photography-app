import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Home } from 'pages/FrontOffice/Home/Home';
import { Galleries } from 'pages/FrontOffice/Galleries/Galleries';

import { UserLayout } from 'layouts/UserLayout';

import { fetchAllCategories } from 'redux/slices/category/category.thunk';

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
				</Routes>
			</UserLayout>
		</BrowserRouter>
	);
}

export default App;
