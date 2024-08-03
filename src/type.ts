import { ReactNode } from "react";

// Notification type definition
export interface Notification {
  id: string;
  type: "TYPE_1" | "TYPE_2" | "TYPE_3";
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Context properties for notifications
export interface NotificationContextProps {
  notifications: Notification[];
  unreadCount: number;
  fetchNotifications: () => void;
  fetchNextPage: () => void;
  addNotification: (type: string) => void;
  markAsRead: (docId: string) => void;
  hasMore: boolean;
}

// Provider properties for notifications
export interface NotificationProviderProps {
  children: ReactNode;
}

// Properties for NotificationMenuItem component
export interface NotificationMenuItemProps {
  notification: Notification;
  markAsRead: (id: string) => void;
}
