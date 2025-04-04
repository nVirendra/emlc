import React, { createContext, useEffect, useState } from 'react';
import { useSocket } from '../lib/socket';

export const NotificationContext = createContext<any>(null);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('new-notification', (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off('new-notification');
    };
  }, [socket]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
