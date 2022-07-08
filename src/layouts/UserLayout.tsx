import React, { FunctionComponent, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch } from 'redux/store';

import { fetchAllCategories } from 'redux/slices/gallery/gallery.thunk';

import UserNavigation from 'components/Navigation/UserNavigation/UserNavigation';
import { Footer } from 'components/UI/Footer/Footer';

export const UserLayout: FunctionComponent = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllCategories())
	}, [dispatch]);
	
	return (
		<>
			<UserNavigation />
			<div id="user" style={{ paddingTop: '81px', paddingBottom: '70px' }}>
					<Outlet />
			</div>
			<Footer />
		</>
	);
}
