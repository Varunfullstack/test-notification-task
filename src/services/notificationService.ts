import {
  collection,
  getDocs,
  doc,
  addDoc,
  onSnapshot,
  DocumentSnapshot,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  updateDoc,
} from "firebase/firestore";
import { firebase_db } from "../firebaseConfig";
import { Notification } from "../type";

// Fetch notifications from Firestore
export const fetchNotifications = async (
  lastDoc?: DocumentSnapshot,
  pageSize: number = 5
): Promise<{
  notifications: Notification[];
  lastDoc: DocumentSnapshot | null;
  hasMore: boolean;
}> => {
  // Query to fetch notifications ordered by creation date, limited to the specified page size
  let q = query(
    collection(firebase_db, "notifications"),
    orderBy("createdAt", "desc"),
    limit(pageSize)
  );

  // If lastDoc is provided, fetch the next set of notifications starting after the last fetched document
  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const querySnapshot = await getDocs(q);
  const notifications = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    type: doc.data().type,
    read: doc.data().read,
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  })) as Notification[];

  // Determine if there are more notifications to fetch
  const hasMore = querySnapshot.docs.length === pageSize;

  // Get the last document from the query snapshot
  const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

  return { notifications, lastDoc: newLastDoc, hasMore };
};

// Add a new notification to Firestore
export const addNotification = async (type: string): Promise<void> => {
  try {
    const currentDate = new Date();
    // Create a new document in the "notifications" collection
    await addDoc(collection(firebase_db, "notifications"), {
      type,
      read: false,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Mark a notification as read in Firestore
export const markAsReadNotifications = async (docId: string): Promise<void> => {
  const notificationsRef = collection(firebase_db, "notifications");

  // Update the document with the specified ID to mark it as read
  await updateDoc(doc(notificationsRef, docId), {
    read: true,
    updatedAt: new Date(),
  });
};

// Subscribe to real-time updates for unread notifications count
export const notificationCount = (
  callback: (notifications: Notification[]) => void
) => {
  // Query to fetch unread notifications
  const q = query(
    collection(firebase_db, "notifications"),
    where("read", "==", false)
  );

  // Subscribe to real-time updates
  return onSnapshot(q, (snapshot) => {
    const newNotifications: Notification[] = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      type: doc.data().type,
      read: doc.data().read,
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Notification[];
    callback(newNotifications);
  });
};

// Subscribe to real-time updates for created or updated notifications
export const updatedOrCreatedNotifications = (
  callback: (notifications: Notification[]) => void
) => {
  // Query to fetch the most recently updated or created notification
  const q = query(
    collection(firebase_db, "notifications"),
    orderBy("updatedAt", "desc"),
    limit(1)
  );

  // Subscribe to real-time updates
  return onSnapshot(q, (snapshot) => {
    const newNotifications: Notification[] = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      type: doc.data().type,
      read: doc.data().read,
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Notification[];
    callback(newNotifications);
  });
};
