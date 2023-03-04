import React, { useEffect } from "react";
import { Avatar, FormLabel, Grid, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { getEventById } from "../../../Store/Actions/EventActions";


interface IViewEvent {
  id: string;
}

const ViewEvent: React.FC<IViewEvent> = ({ id }) => {
  const dispatch = useAppDispatch();

  const currentEvent = useAppSelector(
    (state) => state.event.currentEvent
  );

  useEffect(() => {
    dispatch(getEventById(id));
  }, [id]);

  return (
    <></>
    // <Grid container sx={{ mt: "10px" }} spacing={2}>
    //   <Grid item xs={12} sm={4}>
    //     <FormLabel>Code: </FormLabel>
    //   </Grid>
    //   <Grid item xs={12} sm={6}>
    //     <Typography variant="body1">
    //       {currentEvent && currentEvent?.code}
    //     </Typography>
    //   </Grid>

    //   <Grid item xs={12} sm={4}>
    //     <FormLabel>Name: </FormLabel>
    //   </Grid>
    //   <Grid item xs={12} sm={6}>
    //     <Typography variant="body1">
    //       {currentEvent && currentEvent?.eventName}
    //     </Typography>
    //   </Grid>

    //   <Grid item xs={12} sm={4}>
    //     <FormLabel>Remarks: </FormLabel>
    //   </Grid>
    //   <Grid item xs={12} sm={6}>
    //     <Typography variant="body1">
    //       {currentEvent && currentEvent?.remarks}
    //     </Typography>
    //   </Grid>
    // </Grid>
  );
};

export default ViewEvent;
