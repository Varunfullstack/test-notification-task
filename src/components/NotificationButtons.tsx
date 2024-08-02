import { Button, Grid, Typography } from "@mui/material";

const NotificationButtons = () => {
  return (
    <Grid container padding="12px" gap={2}>
      <Typography>Send Notification</Typography>
      <Grid container item xs={12} spacing={2}>
        <Grid item>
          <Button variant="outlined">type 1</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined">type 2</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined">type 3</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NotificationButtons;
