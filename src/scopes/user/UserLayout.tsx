import { FunctionComponent, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useAppDispatch } from 'redux/store';
import { useRouter } from 'hooks';

import { fetchAllCategories } from 'redux/slices/gallery/gallery.thunk';

import { LayoutContainer } from 'components/UI/LayoutContainer/LayoutContainer';
import { Footer } from 'components/UI/Footer/Footer';
import { TopNavigationBar } from 'components/Navigation/NavigationBar/TopNavigationBar';

import styles from './UserLayout.module.scss';

const MAX_PIXEL_FOR_MOBILE = 850;
const HEADER_SIZE = 113;
const FOOTER_SIZE = 70;

export const UserLayout: FunctionComponent = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();

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
			<LayoutContainer
				headerSize={HEADER_SIZE}
				footerSize={FOOTER_SIZE}
				allowImmersiveHeader={location.pathname === '/'}
			>
				<Outlet />
			</LayoutContainer>
			<Footer />
		</>
	);
}
