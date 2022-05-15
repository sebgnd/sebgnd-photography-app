import React, { CSSProperties, FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

import AdminNavigation from 'components/Navigation/AdminNavigation/AdminNavigation';

export const AdminLayout: FunctionComponent = () => {
	return (
		<>
			<AdminNavigation />
			<div id="admin" style={{paddingTop: '140px', paddingBottom: '70px' }}>
				<Outlet />
			</div>
		</>
	);
}
