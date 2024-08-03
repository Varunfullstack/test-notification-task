import React, { createContext, useState, useEffect } from "react";
import {
  fetchNotifications as getAllNotifications,
  addNotification as createNotification,
  markAsReadNotifications,
  notificationCount as getReadUnreadCount,
  updatedOrCreatedNotifications,
} from "../services/notificationService"; // Adjust the path as necessary
import { DocumentSnapshot } from "firebase/firestore";
import {
  Notification,
  NotificationContextProps,
  NotificationProviderProps,
} from "../type";

// Create a context for notifications
export const NotificationContext = createContext<
  NotificationContextProps | undefined
>(undefined);

// NotificationProvider component to provide notification context to its children
export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Subscribe to real-time updates for unread count
  useEffect(() => {
    const unsubscribe = getReadUnreadCount((newNotifications) => {
      setUnreadCount(newNotifications.length);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Subscribe to real-time updates for notifications
  useEffect(() => {
    const unsubscribe = updatedOrCreatedNotifications((newNotifications) => {
      if (newNotifications.length === 0) {
        return;
      }
      setNotifications((prev) => {
        // Use a Set to track existing notifications by their IDs
        const updatedNotifications = new Set(prev.map((n) => n.id));

        // Iterate through new notifications
        newNotifications.forEach((n) => {
          // If notification already exists, update it
          if (updatedNotifications.has(n.id)) {
            prev = prev.map((notification) =>
              notification.id === n.id
                ? { ...notification, ...n }
                : notification
            );
          } else {
            // If notification is new, prepend it to the list
            prev = [n, ...prev];
          }
        });
        return prev;
      });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Fetch initial notifications
  const fetchNotifications = async () => {
    const {
      notifications: newNotifications,
      lastDoc: newLastDoc,
      hasMore: moreAvailable,
    } = await getAllNotifications();
    setNotifications(newNotifications);
    setLastDoc(newLastDoc);
    setHasMore(moreAvailable);
  };

  // Fetch next page of notifications
  const fetchNextPage = async () => {
    if (!lastDoc || !hasMore) return;
    const {
      notifications: newNotifications,
      lastDoc: newLastDoc,
      hasMore: moreAvailable,
    } = await getAllNotifications(lastDoc);
    setNotifications((prev) => {
      // Use a Set to track existing notifications by their IDs
      const updatedNotifications = new Set(prev.map((n) => n.id));

      // Add new notifications if they don't already exist
      newNotifications.forEach((n) => {
        if (!updatedNotifications.has(n.id)) {
          prev = [...prev, n];
        }
      });
      return prev;
    });
    setLastDoc(newLastDoc);
    setHasMore(moreAvailable);
  };

  // Add a new notification
  const addNotification = async (type: string) => {
    await createNotification(type);
  };

  // Mark a notification as read
  const markAsRead = async (docId: string) => {
    await markAsReadNotifications(docId);
  };

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        fetchNotifications,
        fetchNextPage,
        addNotification,
        markAsRead,
        hasMore,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
