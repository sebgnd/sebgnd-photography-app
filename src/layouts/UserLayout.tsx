import { FunctionComponent, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch } from 'redux/store';

import { fetchAllCategories } from 'redux/slices/gallery/gallery.thunk';

import { Footer } from 'components/UI/Footer/Footer';
import { TopNavigationBar } from 'components/Navigation/NavigationBar/TopNavigationBar';

import styles from './UserLayout.module.scss';

const MAX_PIXEL_FOR_MOBILE = 850;

export const UserLayout: FunctionComponent = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllCategories())
	}, [dispatch]);
	
	return (
		<>
			<TopNavigationBar
				height={81}
				items={[
					{ name: 'Home', url: '/' },
					{ name: 'Galleries', url: '/galleries' },
					{ name: 'Recent', url: '/recent' },
				]}
				maxPixelForMobile={MAX_PIXEL_FOR_MOBILE}
				logo={{
					src: '/images/logo.png',
					url: '/',
				}}
				classNames={{
					container: styles.userNavigationContainer,
					layout: styles.userNavigationLayout,
				}}
			/>
			<div id="user" style={{ paddingTop: '81px', paddingBottom: '70px' }}>
				<Outlet />
			</div>
			<Footer />
		</>
	);
}
