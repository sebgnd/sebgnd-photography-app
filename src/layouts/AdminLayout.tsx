import { FunctionComponent, useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { request, initializeAuthorizationInterceptor, ejectInterceptor } from 'libs/http/request';

import { useAppDispatch, store } from 'redux/store';

import { actions as galleryActions } from 'redux/slices/gallery/gallery.slice';
import { fetchAllCategories } from 'redux/slices/gallery/gallery.thunk';
import { actions as userActions } from 'redux/slices/user/user.slice';
import { refreshToken, REFRESH_TOKEN_ENDPOINT } from 'redux/slices/user/user.thunk';

import { useSocket } from 'hooks';
import { useRouter } from 'hooks';

import { TopNavigationBar } from 'components/Navigation/NavigationBar/TopNavigationBar';

import styles from './AdminLayout.module.scss';
import { selectUserToken } from 'redux/slices/user/user.selector';

type ImageProcessedMessage = {
	data: {
		id: string,
		processed: boolean,
	}
};

export const AdminLayout: FunctionComponent = () => {
	const socket = useSocket();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { propsForNavigation } = useRouter('admin', '/images/logo.png');

	const handleImageProcessed = useCallback(({ data }: ImageProcessedMessage) => {
		dispatch(galleryActions.setImageProcessStatus({
			id: data.id,
			status: data.processed ? 'valid' : 'processing'
		}))
	}, [dispatch]);

	const handleLogout = useCallback(async () => {
		const response = await request('iam/logout', {
			method: 'POST',
			credentials: true,
		});

		if (response.status === 204) {
			dispatch(userActions.clearAuthenticationToken())
			navigate('/admin/login');
		}
	}, [dispatch, navigate]);

	useEffect(() => {
		socket.on('image-processing:image-processed', handleImageProcessed);

		return () => {
			socket.off('image-processing:image-processed');
		}
	}, [handleImageProcessed, socket]);

	useEffect(() => {
		const interceptorId = initializeAuthorizationInterceptor({
			refreshTokenEndpoint: REFRESH_TOKEN_ENDPOINT,
			updateRefreshToken: async () => {
				await dispatch(refreshToken())
			},
			getAuthorizationToken: () => selectUserToken(store.getState()),
		});

		/**
		 * Neither dispatch or router info should change, so it's ok
		 * to fetch the categories in the useEffect.
		 */
		 dispatch(fetchAllCategories());

		return () => {
			ejectInterceptor(interceptorId);
		};
	}, [dispatch])

	return (
		<>
			<TopNavigationBar
				height={125}
				items={[
					...propsForNavigation.items,
					{ name: 'Log out', onClick: handleLogout },
				]}
				logo={propsForNavigation.logo}
				classNames={{
					layout: styles.navigationLayout,
				}}
			/>
			<div id="admin" style={{paddingTop: '140px', paddingBottom: '70px' }}>
				<Outlet />
			</div>
		</>
	);
}
