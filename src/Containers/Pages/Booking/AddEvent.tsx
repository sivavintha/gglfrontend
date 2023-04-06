import React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Container,
  FormLabel,
  Autocomplete,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Hooks";


import { Cancel, Save } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import { getBookingById, getBookings, updateBooking } from "../../../Store/Actions/BookingActions";
import { bookingActions } from "../../../Store/Reducers/BookingReducer";

interface IAddEvent {
  id?: string;
}

const AddEvent: React.FC<IAddEvent> = ({ id }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const newState = location.state as IAddEvent;
  const bookingId: any = newState?.id;
  const navigate = useNavigate();
  const bookingData = useAppSelector((state) => state.booking.bookings);
  const currentBooking = useAppSelector(
    (state) => state.booking.currentBooking
  );
  const currentStatus = useAppSelector((state) => state.booking.status);

  const DEFAULT_FORM_VALUES = {
    bookingNo: null,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm<any>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  React.useEffect(() => {
    if (currentStatus && currentStatus.type === "success") {
      reset();
    }
  }, [currentStatus]);

  React.useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  React.useEffect(() => {
    if (bookingId) {
      dispatch(getBookingById(bookingId));
    } else {
      dispatch(bookingActions.fetchBookingById({ booking: null }));
    }
  }, [bookingId, dispatch]);

  React.useEffect(() => {
    if (currentBooking) {
      console.log('booking details ===>', currentBooking)
      setValue("bookingNo", currentBooking);
      const events = {...currentBooking.events}

      setValue("productionPlannedDt", events.productionPlannedDt);
      setValue("productionActualDt", events.productionActualDt);
      setValue("containerBookingPlannedDt", events.containerBookingPlannedDt);
      setValue("containerBookingActualDt", events.containerBookingActualDt);
      setValue("doReleasePlannedDt", events.doReleasePlannedDt);
      setValue("doReleaseActualDt", events.doReleaseActualDt);
      setValue("containerCollectionPlannedDt", events.containerCollectionPlannedDt);
      setValue("containerCollectionActualDt", events.containerCollectionActualDt);
      setValue("containerStuffingPlannedDt", events.containerStuffingPlannedDt);
      setValue("containerStuffingActualDt", events.containerStuffingActualDt);
      setValue("containerDispatchPlannedDt", events.containerDispatchPlannedDt);
      setValue("containerDispatchActualDt", events.containerDispatchActualDt);
      setValue("containerArrivalPlannedDt", events.containerArrivalPlannedDt);
      setValue("containerArrivalActualDt", events.containerArrivalActualDt);
      setValue("containerLoadingPlannedDt", events.containerLoadingPlannedDt);
      setValue("containerLoadingActualDt", events.containerLoadingActualDt);
      setValue("originETDPlannedDt", events.originETDPlannedDt);
      setValue("originETDActualDt", events.originETDActualDt);
      setValue("port1ArrivalPlannedDT", events.port1ArrivalPlannedDT);
      setValue("port1ArrivalActualDT", events.port1ArrivalActualDT);
      setValue("port1DeparturePlannedDt", events.port1DeparturePlannedDt);
      setValue("Port1DepartureActualDT", events.Port1DepartureActualDT);
      setValue("port2ArrivalPlannedDT", events.port2ArrivalPlannedDT);
      setValue("port2ArrivalActualDT", events.port2ArrivalActualDT);
      setValue("port2DeparturePlannedDt", events.port2DeparturePlannedDt);
      setValue("Port2DepartureActualDT", events.Port2DepartureActualDT);
      setValue("port3ArrivalPlannedDT", events.port3ArrivalPlannedDT);
      setValue("port3ArrivalActualDT", events.port3ArrivalActualDT);
      setValue("port3DeparturePlannedDt", events.port3DeparturePlannedDt);
      setValue("Port3DepartureActualDT", events.Port3DepartureActualDT);
      setValue("destinationETAPlannedDt", events.destinationETAPlannedDt);
      setValue("destinationETAActualDt", events.destinationETAActualDt);
      setValue("containerUnloadingPlannedDT", events.containerUnloadingPlannedDT);
      setValue("containerUnloadingActualDt", events.containerUnloadingActualDt);
      setValue("containerScanPlnnedDt", events.containerScanPlnnedDt);
      setValue("containerScanActualDt", events.containerScanActualDt);
      setValue("containerRelasePlannedDt", events.containerRelasePlannedDt);
      setValue("containerRelaseActualDt", events.containerRelaseActualDt);
      setValue("containerPickupPlannedDt", events.containerPickupPlannedDt);
      setValue("containerPickupActualDt", events.containerPickupActualDt);
      setValue("containerDeliveryPlannedDt", events.containerDeliveryPlannedDt);
      setValue("containerDeliveryActualDt", events.containerDeliveryActualDt);
      setValue("containerReturnPlannedDt", events.containerReturnPlannedDt);
      setValue("containerReturnActualDt", events.containerReturnActualDt);
      // setValue("bookingNo", events);
      // setValue("bookingNo", events);

      
      } else {
      reset(DEFAULT_FORM_VALUES);
    }
  }, [currentBooking]);

  const submitHandler = (data: any, event: any) => {
    event.preventDefault();
    console.log("data ===>", data);
    const events = { ...data };
    delete events.bookingNo
    const booking: any = {
      _id: data.bookingNo._id,
      events: events,
    };
    if (bookingId) {
      booking._id = bookingId;
      dispatch(updateBooking(booking, "EVENTS"));
      navigate("/booking");
    } else {
      dispatch(updateBooking(booking, "EVENTS"));
    }
  };

  const cancelHandler = () => {
    reset();

    if (bookingId) {
      navigate("/booking");
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <form
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        style={{ marginTop: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <FormLabel>Select Booking: </FormLabel>
          </Grid>
          <Grid item xs={12} md={3}>
            <Controller
              control={control}
              name="bookingNo"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  id="bookingNo"
                  value={value}
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  options={bookingData}
                  getOptionLabel={(option) =>
                    option.bookingNo ? option.bookingNo : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.bookingNo === value.bookingNo
                  }
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="Booking #"
                      error={!!errors.booking}
                      helperText={errors.booking && "Booking is required"}
                      size="small"
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {" "}
          </Grid>

          <Grid item xs={12} md={4}>
            <fieldset>
              <legend>Origin Events</legend>
              <Grid item container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="productionPlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Production Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="productionActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Production Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerBookingPlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Booking Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerBookingActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Booking Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="doReleasePlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Do Release Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="doReleaseActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Do Release Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerCollectionPlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Collection Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerCollectionActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Collection Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerStuffingPlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Stuffing Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerStuffingActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Stuffing Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerDispatchPlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Dispatch Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerDispatchActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Dispatch Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerArrivalPlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Arrival Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerArrivalActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Arrival Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerLoadingPlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Loading Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerLoadingActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Loading Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </fieldset>
          </Grid>

          <Grid item xs={12} md={4}>
            <fieldset>
              <legend>Vessel Events</legend>
              <Grid item container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="originETDPlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Origin ETD Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="originETDActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Origin ETD Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="port1ArrivalPlannedDT"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Arrival @  Port 1 Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="port1ArrivalActualDT"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Arrival @  Port 1 Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="port1DeparturePlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Departure @ Port 1 Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="Port1DepartureActualDT"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Departure @  Port 1 Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="port2ArrivalPlannedDT"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Arrival @  Port 2 Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="port2ArrivalActualDT"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Arrival @  Port 2 Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="port2DeparturePlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Departure @ Port 2 Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="Port2DepartureActualDT"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Departure @  Port 2 Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="port3ArrivalPlannedDT"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Arrival @  Port 3 Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="port3ArrivalActualDT"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Arrival @  Port 3 Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="port3DeparturePlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Departure @ Port 3 Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="Port3DepartureActualDT"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Departure @  Port 3 Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="destinationETAPlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Destination ETA Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="destinationETAActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Destination ETA Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </fieldset>
          </Grid>

          <Grid item xs={12} md={4}>
            <fieldset>
              <legend>Destination Events</legend>
              <Grid item container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerUnloadingPlannedDT"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container UnLoading Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerUnloadingActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container UnLoading Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerScanPlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Scan Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerScanActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Scan Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerRelasePlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Release Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerRelaseActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Release Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerPickupPlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Pickup Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerPickupActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Pickup Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerDeliveryPlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Delivery Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerDeliveryActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Delivery Actual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerReturnPlannedDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Return Planned Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="containerReturnActualDt"
                    defaultValue={moment().toDate()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Container Return ACtual Date"
                        inputFormat="DD/MM/yyyy"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </fieldset>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              color="info"
              fullWidth
              startIcon={<Cancel />}
              onClick={cancelHandler}
            >
              Cancel
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              startIcon={<Save />}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddEvent;
