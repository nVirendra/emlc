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

    const handleNotification = (notification: Notification) => {
      console.log('📥 New notification received:', notification);
      setNotifications((prev) => [notification, ...prev]);
    };

    socket.on('new-notification', handleNotification);

    return () => {
      socket.off('new-notification', handleNotification);
    };
  }, [socket]); // 👈 crucial!

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
