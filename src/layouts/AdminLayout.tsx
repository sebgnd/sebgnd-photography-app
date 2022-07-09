import { FunctionComponent, useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { request } from 'libs/http/request';

import { useAppDispatch } from 'redux/store';

import { actions as galleryActions } from 'redux/slices/gallery/gallery.slice';
import { fetchAllCategories } from 'redux/slices/gallery/gallery.thunk';
import { actions as userActions } from 'redux/slices/user/user.slice';

import { useSocket } from 'hooks';

import { TopNavigationBar } from 'components/Navigation/NavigationBar/TopNavigationBar';

import styles from './AdminLayout.module.scss';

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
		dispatch(fetchAllCategories());
	}, [dispatch]);

	return (
		<>
			<TopNavigationBar
				height={125}
				items={[
					{ name: 'Home', url: '/admin/home' },
					{ name: 'Gallery settings', url: '/admin/gallery-settings' },
					{ name: 'Log out', onClick: handleLogout },
				]}
				logo={{
					src: '/images/logo.png',
					url: '/admin/home',
				}}
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
