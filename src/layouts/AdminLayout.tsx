import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch } from 'redux/store';
import { actions } from 'redux/slices/gallery/gallery.slice';

import { useSocket } from 'hooks';

import AdminNavigation from 'components/Navigation/AdminNavigation/AdminNavigation';

type ImageProcessedMessage = {
	id: string,
	processed: boolean,
};

export const AdminLayout: FunctionComponent = () => {
	const socket = useSocket();
	const dispatch = useAppDispatch();

	const handleImageProcessed = useCallback((message: ImageProcessedMessage) => {
		dispatch(actions.setImageProcessedStatus({
			id: message.id,
			status: message.processed ? 'valid' : 'processing'
		}))
	}, [dispatch]);

	useEffect(() => {
		socket.on('image-processing:image-processed', handleImageProcessed)
	}, [handleImageProcessed, socket]);

	return (
		<>
			<AdminNavigation />
			<div id="admin" style={{paddingTop: '140px', paddingBottom: '70px' }}>
				<Outlet />
			</div>
		</>
	);
}
