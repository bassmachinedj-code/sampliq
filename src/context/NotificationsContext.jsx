import { createContext, useContext, useMemo, useState } from 'react';

const NotificationsContext = createContext();

const defaultNotifications = [
  {
    id: 'n1',
    title: 'New sample pack available',
    message: 'Trap Essentials Vol. 3 is now live on Splice',
    time: '2 hours ago',
    type: 'package',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Download complete',
    message: '808 Kick - Heavy Sub.wav',
    time: '5 hours ago',
    type: 'download',
    unread: true,
  },
  {
    id: 'n3',
    title: 'Your favorite sample was updated',
    message: 'Lo-Fi Piano Loop - Dusty (Remastered)',
    time: 'Yesterday',
    type: 'star',
    unread: false,
  },
];

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(defaultNotifications);

  const markAllRead = () => {
    setNotifications((items) => items.map((item) => ({ ...item, unread: false })));
  };

  const markRead = (id) => {
    setNotifications((items) =>
      items.map((item) => (item.id === id ? { ...item, unread: false } : item))
    );
  };

  const value = useMemo(() => ({
    notifications,
    unreadCount: notifications.filter((n) => n.unread).length,
    markAllRead,
    markRead,
  }), [notifications]);

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error('useNotifications must be used within NotificationsProvider');
  }
  return ctx;
}
