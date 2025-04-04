import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

export const useSocket = (): Socket | null => {
  const { user } = useAuth();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (user?.id && !socketRef.current) {
      console.log('on socket', user.id);
      const socketInstance = io('http://localhost:5000', {
        query: { userId: user.id },
        transports: ['websocket'], // optional: forces WebSocket
      });

      socketRef.current = socketInstance;

      return () => {
        socketInstance.disconnect();
        socketRef.current = null;
      };
    }
  }, [user]);

  return socketRef.current;
};
