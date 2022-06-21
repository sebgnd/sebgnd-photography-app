import React, { FunctionComponent, useState } from 'react';

import TopNavigation from './TopNavigation/TopNavigation';

const normalItems = [
	{ url: '/admin/home', name: 'Home' },
	{ url: '/admin/gallery-settings', name: 'Gallery Settings' },
];


const AdminNavigation: FunctionComponent = () => {
	const [moreNavOpen, setMoreNavOpen] = useState<boolean>(false);

	const toggleMoreNav = () => {
		setMoreNavOpen(prevMoreNavOpen => !prevMoreNavOpen);
	}

	return (
		<nav>
			<TopNavigation 
				normalItems={normalItems} 
				onMoreClick={toggleMoreNav}
				isMoreOpen={moreNavOpen}
			/>
		</nav>
	);
};

export default AdminNavigation;
