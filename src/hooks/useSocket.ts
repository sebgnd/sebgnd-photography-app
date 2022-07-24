import { useContext } from 'react';

import { SocketContext } from 'contexts/SocketContext';

export const useSocket = () => {
	const socketContext = useContext(SocketContext);

	if (socketContext.socket === null) {
		throw new Error('Cannot use socket outside its context');
	}

	return socketContext.socket;
}