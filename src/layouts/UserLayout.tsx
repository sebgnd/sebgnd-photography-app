import React, { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

import UserNavigation from 'components/Navigation/UserNavigation/UserNavigation';
import { Footer } from 'components/UI/Footer/Footer';

export const UserLayout: FunctionComponent = () => {
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
