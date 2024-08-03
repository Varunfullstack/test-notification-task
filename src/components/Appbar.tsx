import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
} from "@mui/material";
import { NotificationsOutlined } from "@mui/icons-material";
import { useState } from "react";
import NotificationMenuItem from "./NotificationMenuItem";
import { useNotifications } from "../hooks/useNotification";

// Appbar component to display notifications
const Appbar = () => {
  const { notifications, unreadCount, markAsRead, fetchNextPage, hasMore } =
    useNotifications();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Handle click on notification icon
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle close of notification menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          NotifyMe
        </Typography>
        <IconButton color="inherit" onClick={handleClick}>
          <Badge badgeContent={unreadCount} color="secondary">
            <NotificationsOutlined />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            style: {
              width: 300,
            },
          }}
        >
          {notifications.map((notification) => (
            <NotificationMenuItem
              key={notification.id}
              notification={notification}
              markAsRead={markAsRead}
            />
          ))}
          {hasMore && (
            <button className="loadButton" onClick={fetchNextPage}>
              Load More
            </button>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
