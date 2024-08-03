import { Button, Grid, Typography } from "@mui/material";
import { useNotifications } from "../hooks/useNotification";

// Component to display buttons for sending notifications
const NotificationButtons = () => {
  const { addNotification } = useNotifications();

  return (
    <Grid container padding="12px" gap={2}>
      <Typography>Send Notification</Typography>
      <Grid container item xs={12} spacing={2}>
        <Grid item>
          <Button variant="outlined" onClick={() => addNotification("TYPE_1")}>
            Type 1
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => addNotification("TYPE_2")}>
            Type 2
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => addNotification("TYPE_3")}>
            Type 3
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NotificationButtons;
