import React, { createContext, useEffect, useState } from 'react';
import { useSocket } from '../lib/socket';
import { Notification } from '../types/notification';

interface NotificationContextType {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  setNotifications: () => {}, // dummy function to avoid undefined
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('new-notification', (notification: Notification) => {
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
