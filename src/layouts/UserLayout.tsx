import { FunctionComponent, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch } from 'redux/store';
import { useRouter } from 'hooks';

import { fetchAllCategories } from 'redux/slices/gallery/gallery.thunk';

import { Footer } from 'components/UI/Footer/Footer';
import { TopNavigationBar } from 'components/Navigation/NavigationBar/TopNavigationBar';

import styles from './UserLayout.module.scss';

const MAX_PIXEL_FOR_MOBILE = 850;

export const UserLayout: FunctionComponent = () => {
	const dispatch = useAppDispatch();
	const { propsForNavigation } = useRouter('index');

	useEffect(() => {
		dispatch(fetchAllCategories())
	}, [dispatch]);
	
	return (
		<>
			<TopNavigationBar
				{...propsForNavigation}
				height={81}
				maxPixelForMobile={MAX_PIXEL_FOR_MOBILE}
				classNames={{
					container: styles.userNavigationContainer,
					layout: styles.userNavigationLayout,
					active: styles.activeItem,
				}}
			/>
			<div id="user" style={{ paddingTop: '96px', paddingBottom: '70px' }}>
				<Outlet />
			</div>
			<Footer />
		</>
	);
}
