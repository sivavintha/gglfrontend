import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
  FormLabel,
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  Link,
  Badge,
  Switch,
} from "@mui/material";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import {
  addNewEvent,
  getEventById,
  updateEvent,
} from "../../../Store/Actions/EventActions";
import { eventActions } from "../../../Store/Reducers/EventReducer";

import CountryList from "../../../Helpers/countryList";
import CountrySelector from "../../../Components/CountrySelector";
import {
  AddAPhoto,
  Cancel,
  Delete,
  Photo,
  Remove,
  Save,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { getGST } from "../../../Store/Actions/GSTActions";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";

interface IAddEvent {
  id?: string;
}

const AddEvent: React.FC<IAddEvent> = ({ id }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const newState = location.state as IAddEvent;
  const eventId: any = newState?.id;
  const navigate = useNavigate();
  const currentEvent = useAppSelector((state) => state.event.currentEvent);
  const bookingData = useAppSelector((state) => state.booking.bookings);

  const currentStatus = useAppSelector((state) => state.event.status);
  const [productionPlannedDt, setProductionPlannedDt] = React.useState<any>(
    moment()
  );
  const [productionActualDt, setProductionActualDt] = React.useState<any>(
    moment()
  );

  const DEFAULT_FORM_VALUES = {
    eventName: "",
    remarks: "",
    hsnCode: "",
    // gstApplicable: false,
    // gstSlab: gstData[0],
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
    dispatch(getGST());
  }, [dispatch]);

  React.useEffect(() => {
    if (eventId) {
      dispatch(getEventById(eventId));
    } else {
      dispatch(eventActions.fetchEventById({ event: null }));
    }
  }, [eventId]);

  const handleProductionPlannedDt = (newValue: any) => {
    setProductionPlannedDt(newValue);
  };

  const handleProductionActualDt = (newValue: any) => {
    setProductionActualDt(newValue);
  };
  // React.useEffect(() => {
  //   if (currentEvent) {
  //     setValue("eventName", currentEvent.eventName);
  //     setValue("remarks", currentEvent.remarks);
  //     setValue("hsnCode", currentEvent.hsnCode);
  //     setValue("gstSlab", currentEvent.gstSlab);
  //     setValue("gstApplicable", currentEvent.gstApplicable);
  //   } else {
  //     reset(DEFAULT_FORM_VALUES);
  //   }
  // }, [currentEvent]);

  const submitHandler = (data: any, event: any) => {
    event.preventDefault();
    // const events = { ...data };
    // if (!event.gstApplicable) {
    //   event.gstSlab = null;
    // } else {
    //   event.gstSlab = event.gstSlab._id;
    // }

    // if (eventId) {
    //   event._id = eventId;
    //   dispatch(updateEvent(event));
    //   navigate("/master/event");
    // } else {
    //   dispatch(addNewEvent(event));
    // }
  };

  const cancelHandler = () => {
    reset();

    if (eventId) {
      navigate("/master/event");
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
              name="booking"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  id="booking"
                  value={value}
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  options={[{ bookingNo: "BE23000001" }] || bookingData}
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
                  <DesktopDatePicker
                    label="Production Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Production Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Booking Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Booking Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="DO Release Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="DO Release Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Collection Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Collection Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Stuffing Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Stuffing Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Dispatch Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Dispatch Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Arrival Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Arrival Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Loading Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Loading Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
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
                  <DesktopDatePicker
                    label="Origin ETD Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Origin ETD Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Arrival @  Port 1 Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Arrival @  Port 1 Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Departure @  Port 1 Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Departure @  Port 1 Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Arrival @  Port 2 Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Arrival @  Port 2 Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Departure @  Port 2 Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Departure @  Port 2 Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Arrival @  Port 3 Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Arrival @  Port 3 Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Departure @  Port 3 Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Departure @  Port 3 Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Destination ETA Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Destination ETA Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
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
                  <DesktopDatePicker
                    label="Container UnLoading Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container UnLoading Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Scan Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Scan Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Release Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Release Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Pickup Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Pickup Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Delivery Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Delivery Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Return Planned Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionPlannedDt}
                    onChange={handleProductionPlannedDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DesktopDatePicker
                    label="Container Return Actual Date"
                    inputFormat="MM/DD/YYYY"
                    value={productionActualDt}
                    onChange={handleProductionActualDt}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
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
