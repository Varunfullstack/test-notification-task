import React from "react";
import { MenuItem, ListItemText } from "@mui/material";

interface Notification {
  id: string;
  description: string;
  read: boolean;
}

interface NotificationMenuItemProps {
  notification: Notification;
}

const NotificationMenuItem: React.FC<NotificationMenuItemProps> = ({
  notification,
}) => {
  return (
    <MenuItem
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        backgroundColor: notification.read ? undefined : "beige",
      }}
    >
      <ListItemText primary="Notification" />
      <ListItemText secondary={notification.description} />
    </MenuItem>
  );
};

export default NotificationMenuItem;
