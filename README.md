# React Notify

React Notify is a notification system built with React and Firebase. It provides real-time updates for notifications, including unread counts and the ability to mark notifications as read.

## Features

- Real-time updates for notifications
- Unread notification count
- Pagination for notifications
- Add new notifications
- Mark notifications as read when clicking on them

## Getting Started

### Prerequisites

- Node.js
- Firebase account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/react-notify.git
   cd react-notify
   Install dependencies:
   npm install
   ```

Set up Firebase Emulators:
Install Firebase CLI if you haven't already:
npm install -g firebase-tools

Initialize Firebase emulators:
Start the Firebase emulators:
firebase emulators:start

Start the development server:
npm run dev

## Project Structure

- `src/context/NotificationContext.tsx`: Provides the notification context and manages the state of notifications.
- `src/services/notificationService.ts`: Contains functions to interact with Firebase Firestore for fetching, adding, and updating notifications.
- `src/components/Appbar.tsx`: Displays the app bar with the notification icon and menu.
- `src/components/NotificationMenuItem.tsx`: Displays individual notification items in the menu.
- `src/components/NotificationButtons.tsx`: Provides buttons to send different types of notifications.
- `src/hooks/useNotification.ts`: Custom hook to use the notification context.
- `src/App.tsx`: Main application component.
- `src/main.tsx`: Entry point of the application.
- `firebase.json`: Configuration file for Firebase emulators.
