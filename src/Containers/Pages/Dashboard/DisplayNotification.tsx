import * as React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

interface IDisplayNotification {
  item: any;
}

const DisplayNotification: React.FC<IDisplayNotification> = ({ item }) => {
  return (
    <Grid container sx={{ mt: "10px" }} spacing={2}>
      <Grid item xs={12} sm={4}>
        <FormLabel>Type: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body2">{item.type}</Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>Name: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body2">{item.user}</Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>Requested Date/Time: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={8}>
        {item &&
          item.data &&
          item.data.timeoff &&
          item.data.timeoff.map((req: any) => (
            <Typography key={req.id} variant="body2">
              {req.fromTime} - {req.toTime}
            </Typography>
          ))}
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>Reason: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body2">{item.data?.reason}</Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>Applied On: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body2">{item.data?.createdAt}</Typography>
      </Grid>
    </Grid>
  );
};

export default DisplayNotification;
