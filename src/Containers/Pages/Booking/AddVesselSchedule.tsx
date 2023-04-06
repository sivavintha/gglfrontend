import * as React from "react";
import {
  useForm,
  useFieldArray,
  useFormContext,
  Controller,
} from "react-hook-form";
import {
  TextField,
  Button,
  Autocomplete,
  Grid,
  Container,
  CssBaseline,
  Tooltip,
  Fab,
  Box,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import {
  getBookings,
  updateBooking,
  getBookingById,
} from "../../../Store/Actions/BookingActions";
import { bookingActions } from "../../../Store/Reducers/BookingReducer";

import { Cancel, Save, Add, Remove } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { getMovementType } from "../../../Store/Actions/MovementTypeActions";
import moment from "moment";
import { getSeaPorts } from "../../../Store/Actions/SeaPortsActions";
import { DesktopDatePicker } from "@mui/x-date-pickers";

type FormValues = {
  bookingNo: any;

  vesselSchedule: {
    legNo: string;
    vesselType: any;
    vesselName: string;
    voyage: string;
    portFrom: any;
    portTo: any;
    ETD: Date;
    ETA: Date;
    sailedDt: Date;
    arrivedDt: Date;
  }[];
};

interface IAddVesselSchedule {
  id?: string;
}

const AddVesselSchedule = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const newState = location.state as IAddVesselSchedule;
  const bookingId: any = newState?.id;
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [rowCount, setRowCount] = React.useState(0);
  const [editVslValues, setEditVslValues] = React.useState<any>();

  const bookingData = useAppSelector((state) => state.booking.bookings);
  const currentBooking = useAppSelector(
    (state) => state.booking.currentBooking
  );
  const portData = useAppSelector((state) => state.seaPorts.seaPorts);

  const currentStatus = useAppSelector((state) => state.booking.status);

  const movementDataType = useAppSelector(
    (state) => state.movementType.movementTypes
  );

  const DEFAULT_FORM_VALUES = {
    bookingNo: null,
    vesselSchedule: [],
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<FormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const onError = (errors: any, e: any) => console.log(errors, e);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "vesselSchedule",
  });

  React.useEffect(() => {
    dispatch(getBookings(true));
    dispatch(getMovementType(true));
    dispatch(getSeaPorts(true));
  }, [dispatch]);

  React.useEffect(() => {
    if (currentStatus && currentStatus.type === "success") {
      reset();
    }
  }, [currentStatus, reset]);

  React.useEffect(() => {
    if (bookingId) {
      dispatch(getBookingById(bookingId));
    } else {
      dispatch(bookingActions.fetchBookingById({ booking: null }));
    }
  }, [bookingId, dispatch]);

  React.useEffect(() => {
    if (currentBooking && portData && movementDataType) {
      const vesselSchedule: any[] = [];
      currentBooking.vesselSchedule.map((vsl) => {
        const newObj = { ...vsl };

        const vslType = movementDataType.filter((mvmnt) => {
          return mvmnt._id === vsl.vesselType;
        });
        newObj.vesselType = vslType[0];

        const portFrom = portData.filter((port) => {
          return port._id === vsl.portFrom;
        });
        newObj.portFrom = portFrom[0];

        const portTo = portData.filter((port) => {
          return port._id === vsl.portTo;
        });
        newObj.portTo = portTo[0];
        vesselSchedule.push(newObj);

        return vsl;
      });
      if (vesselSchedule.length > 0) {
        const newObj = {
          bookingNo: { ...currentBooking },
          vesselSchedule: vesselSchedule,
        };

        setEditVslValues(newObj);
      }
    }
  }, [currentBooking, portData, movementDataType]);

  React.useEffect(() => {
    if (editVslValues) {
      setValue("bookingNo", editVslValues.bookingNo);
      setValue("vesselSchedule", editVslValues.vesselSchedule);
      setRowCount(editVslValues.vesselSchedule.length);
    }
  }, [editVslValues]);

  const onSubmit = (data: FormValues, event: any) => {
    event.preventDefault();

    if (!data.vesselSchedule || data.vesselSchedule.length === 0) {
      enqueueSnackbar("Please  add atleast one vessel details to save", {
        variant: "error",
      });
      return;
    }
    data.vesselSchedule.map((vsl) => {
      vsl.vesselType = vsl.vesselType._id;
      vsl.portFrom = vsl.portFrom._id;
      vsl.portTo = vsl.portTo._id;
    });

    const booking: any = {
      _id: data.bookingNo._id,
      vesselSchedule: data.vesselSchedule,
    };
    if (bookingId) {
      booking._id = bookingId;
      dispatch(updateBooking(booking, "SCHEDULE"));
      navigate("/booking");
    } else {
      dispatch(updateBooking(booking, "SCHEDULE"));
    }
  };

  const cancelHandler = () => {
    reset();
    setRowCount(0);
    if (bookingId) {
      navigate("/booking");
    }
  };

  const handleRemove = (index: any) => {
    remove(index);
    setRowCount(rowCount - 1);
  };

  const handleAdd = () => {
    append({
      legNo: (rowCount + 1).toString(),
      vesselType: movementDataType[0],
      vesselName: "",
      voyage: "",
      portFrom: "",
      portTo: "",
      ETD: moment().toDate(),
      ETA: moment().toDate(),
      sailedDt: moment().toDate(),
      arrivedDt: moment().toDate(),
    });
    setRowCount(rowCount + 1);
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        style={{ marginTop: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Controller
              control={control}
              name="bookingNo"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  id="bookingNo"
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  value={value}
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
                      label="Booking NO"
                      error={!!errors.bookingNo}
                      helperText={errors.bookingNo && "Booking No is required"}
                      size="small"
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={10}>
            <Tooltip title="Add More Schedule">
              <Fab
                color="success"
                size="small"
                onClick={() => handleAdd()}
                disabled={!watch("bookingNo")}
              >
                <Add />
              </Fab>
            </Tooltip>
          </Grid>

          <Grid item xs={12}>
            {fields.map((item, index) => (
              <Grid container spacing={1.5} key={item.id}>
                <Grid item xs={12} md={0.5}>
                  <TextField
                    label="Leg"
                    {...register(`vesselSchedule.${index}.legNo`, {
                      required: true,
                    })}
                    error={!!errors.vesselSchedule?.[index]?.legNo}
                    helperText={errors.vesselSchedule?.[index]?.legNo?.message}
                    size={"small"}
                    // InputProps={{ inputProps: { min: 11, max: 11} }}
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Controller
                    control={control}
                    name={`vesselSchedule.${index}.vesselType`}
                    rules={{ required: true }}
                    defaultValue={item.vesselType}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        id="vesselType"
                        options={movementDataType}
                        getOptionLabel={(option) =>
                          option.type ? option.type : ""
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.type === value.type
                        }
                        onChange={(event, value) => {
                          onChange(value);
                        }}
                        value={value}
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            label="Vessel Type"
                            error={!!errors.vesselSchedule?.[index]?.vesselType}
                            helperText={
                              errors.vesselSchedule?.[index]?.vesselType
                                ?.message && "Vessel Type is required"
                            }
                            size="small"
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={1.5}>
                  <TextField
                    label="Vessel Name"
                    {...register(`vesselSchedule.${index}.vesselName`, {
                      required: true,
                    })}
                    error={!!errors.vesselSchedule?.[index]?.vesselName}
                    helperText={
                      errors.vesselSchedule?.[index]?.vesselName?.message
                    }
                    size={"small"}
                  />
                </Grid>
                <Grid item xs={12} md={0.75}>
                  <TextField
                    label="Voyage"
                    {...register(`vesselSchedule.${index}.voyage`, {
                      required: true,
                    })}
                    error={!!errors.vesselSchedule?.[index]?.voyage}
                    helperText={errors.vesselSchedule?.[index]?.voyage?.message}
                    // InputProps={{ inputProps: { min: 1 } }}
                    size={"small"}
                  />
                </Grid>

                <Grid item xs={12} md={1.25}>
                  <Controller
                    control={control}
                    name={`vesselSchedule.${index}.portFrom`}
                    rules={{ required: true }}
                    defaultValue={item.portFrom}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        onChange={(event, value) => {
                          onChange(value);
                        }}
                        value={value}
                        options={portData}
                        getOptionLabel={(option) =>
                          option.portName ? option.portName : ""
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.portName === value.portName
                        }
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            label="Port From"
                            error={!!errors.vesselSchedule?.[index]?.portFrom}
                            helperText={
                              errors.vesselSchedule?.[index]?.portFrom
                                ?.message && "Port From is required"
                            }
                            size="small"
                          />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={1.25}>
                  <Controller
                    control={control}
                    name={`vesselSchedule.${index}.portTo`}
                    rules={{ required: true }}
                    defaultValue={item.portTo}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        onChange={(event, value) => {
                          onChange(value);
                        }}
                        value={value}
                        options={portData}
                        getOptionLabel={(option) =>
                          option.portName ? option.portName : ""
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.portName === value.portName
                        }
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            label="Port To"
                            error={!!errors.vesselSchedule?.[index]?.portTo}
                            helperText={
                              errors.vesselSchedule?.[index]?.portTo?.message &&
                              "Port To is required"
                            }
                            size="small"
                          />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={1.25}>
                  <Controller
                    control={control}
                    name={`vesselSchedule.${index}.ETD`}
                    render={({
                      field: { ref, onBlur, name, ...field },
                      fieldState,
                    }) => (
                      <DesktopDatePicker
                        {...field}
                        inputRef={ref}
                        label="ETD"
                        inputFormat="DD/MM/YYYY"
                        renderInput={(inputProps: any) => (
                          <TextField
                            {...inputProps}
                            onBlur={onBlur}
                            name={name}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            size="small"
                          />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={1.25}>
                  <Controller
                    control={control}
                    name={`vesselSchedule.${index}.sailedDt`}
                    // rules={{
                    //   validate: {
                    //     min: (date) =>
                    //       isFuture(date) || "Please, enter a future date",
                    //   },
                    // }}
                    render={({
                      field: { ref, onBlur, name, ...field },
                      fieldState,
                    }) => (
                      <DesktopDatePicker
                        {...field}
                        inputFormat="DD/MM/YYYY"
                        inputRef={ref}
                        label="Sailed Dt"
                        renderInput={(inputProps: any) => (
                          <TextField
                            {...inputProps}
                            onBlur={onBlur}
                            name={name}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            size="small"
                          />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={1.25}>
                  <Controller
                    control={control}
                    name={`vesselSchedule.${index}.ETA`}
                    // rules={{
                    //   validate: {
                    //     min: (date) =>
                    //       isFuture(date) || "Please, enter a future date",
                    //   },
                    // }}
                    render={({
                      field: { ref, onBlur, name, ...field },
                      fieldState,
                    }) => (
                      <DesktopDatePicker
                        {...field}
                        inputRef={ref}
                        inputFormat="DD/MM/YYYY"
                        label="ETA"
                        renderInput={(inputProps: any) => (
                          <TextField
                            {...inputProps}
                            onBlur={onBlur}
                            name={name}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            size="small"
                          />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={1.25}>
                  <Controller
                    control={control}
                    name={`vesselSchedule.${index}.arrivedDt`}
                    // rules={{
                    //   validate: {
                    //     min: (date) =>
                    //       isFuture(date) || "Please, enter a future date",
                    //   },
                    // }}
                    render={({ field, fieldState }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Arrived Dt"
                        inputFormat="DD/MM/YYYY"
                        renderInput={(inputProps: any) => (
                          <TextField
                            {...inputProps}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            size="small"
                          />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={0.5}>
                  {/* {index !== 0 && ( */}
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Tooltip title="Remove Movement">
                      <Fab
                        color="error"
                        size="small"
                        onClick={() => handleRemove(index)}
                      >
                        <Remove />
                      </Fab>
                    </Tooltip>
                  </Box>
                  {/* )} */}
                </Grid>
              </Grid>
            ))}
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

export default AddVesselSchedule;
