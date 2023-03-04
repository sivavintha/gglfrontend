import React, { useEffect } from "react";
import { Avatar, FormLabel, Grid, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { getBookingById } from "../../../Store/Actions/BookingActions";
import { Photo } from "@mui/icons-material";

interface IViewBooking {
  id: string;
}

const ViewBooking: React.FC<IViewBooking> = ({ id }) => {
  const dispatch = useAppDispatch();

  const currentBooking = useAppSelector(
    (state) => state.booking.currentBooking
  );

  useEffect(() => {
    dispatch(getBookingById(id));
  }, [id]);

  return (
    <Grid container sx={{ mt: "10px" }} spacing={2}>
      <Grid item xs={12} sm={4}>
        <FormLabel>Booking No: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          {currentBooking && currentBooking?.bookingNo}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>Shipper: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          {currentBooking && currentBooking?.shipper}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>Consignee: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          {currentBooking && currentBooking?.consignee}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>Line: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          {currentBooking && currentBooking?.line}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>Notifier: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          {currentBooking && currentBooking?.notifier}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>Transporter: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          {currentBooking && currentBooking?.transporter}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ViewBooking;
