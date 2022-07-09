import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch } from 'redux/store';

import { actions } from 'redux/slices/gallery/gallery.slice';
import { fetchAllCategories } from 'redux/slices/gallery/gallery.thunk';

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
	const dispatch = useAppDispatch();

	const handleImageProcessed = useCallback(({ data }: ImageProcessedMessage) => {
		dispatch(actions.setImageProcessStatus({
			id: data.id,
			status: data.processed ? 'valid' : 'processing'
		}))
	}, [dispatch]);

	useEffect(() => {
		socket.on('image-processing:image-processed', handleImageProcessed);
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
