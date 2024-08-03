import React from "react";
import { MenuItem, ListItemText } from "@mui/material";
import { NotificationMenuItemProps } from "../type";

// Component to display individual notification item
const NotificationMenuItem: React.FC<NotificationMenuItemProps> = ({
  notification,
  markAsRead,
}) => {
  return (
    <MenuItem
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        backgroundColor: notification.read ? undefined : "beige",
      }}
      onClick={() => markAsRead(notification.id)}
    >
      <ListItemText primary="Notification" />
      <ListItemText secondary={`Notification ${notification.type}`} />
    </MenuItem>
  );
};

export default NotificationMenuItem;
