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

const notifications = [
  { id: "1", description: "notification type 1", read: true },
  { id: "2", description: "notification type 2", read: false },
];

const Appbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
          <Badge badgeContent={notifications.length} color="secondary">
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
        >
          {notifications.map((notification) => (
            <NotificationMenuItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
