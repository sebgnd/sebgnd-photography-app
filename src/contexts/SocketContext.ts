import React from 'react';
import { Socket } from 'socket.io-client';

export type SocketContextType = {
  socket: Socket | null,
};

export const SocketContext = React.createContext<SocketContextType>({
  socket: null,
});
