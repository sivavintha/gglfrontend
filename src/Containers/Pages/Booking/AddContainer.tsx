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
import { getContainerType } from "../../../Store/Actions/ContainerTypeActions";

type FormValues = {
  bookingNo: any;

  containers: {
    containerNo: string;
    containerType: any;
    sealNo: string;
    noOfPackages: number;
    grossWt: number;
    netWt: number;
    cbm: number;
  }[];
};

interface IAddContainer {
  id?: string;
}

const AddContainer = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const newState = location.state as IAddContainer;
  const bookingId: any = newState?.id;
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [editCntValues, setEditCntValues] = React.useState<any>();

  const bookingData = useAppSelector((state) => state.booking.bookings);
  const currentBooking = useAppSelector(
    (state) => state.booking.currentBooking
  );
  const currentStatus = useAppSelector((state) => state.booking.status);

  const containerDataType = useAppSelector(
    (state) => state.containerType.containerTypes
  );

  // const containerDataType = [
  //   {
  //     type: "20 GP",
  //     abbr: "20",
  //   },
  //   {
  //     type: "20 HC",
  //     abbr: "2H",
  //   },
  //   {
  //     type: "20 LCL",
  //     abbr: "2L",
  //   },
  //   {
  //     type: "20 FCL",
  //     abbr: "2F",
  //   },
  //   {
  //     type: "20 PART",
  //     abbr: "2P",
  //   },
  //   {
  //     type: "40 GP",
  //     abbr: "40",
  //   },
  //   {
  //     type: "40 HC",
  //     abbr: "4H",
  //   },
  //   {
  //     type: "40 FCL",
  //     abbr: "4F",
  //   },
  //   {
  //     type: "40 PART",
  //     abbr: "4P",
  //   },
  //   {
  //     type: "20 OT",
  //     abbr: "2T",
  //   },
  //   {
  //     type: "40 OT",
  //     abbr: "4T",
  //   },
  //   {
  //     type: "20 REEFER",
  //     abbr: "2R",
  //   },
  //   {
  //     type: "40 REEFER",
  //     abbr: "4R",
  //   },
  //   {
  //     type: "20 ISO TANKER",
  //     abbr: "2I",
  //   },
  //   {
  //     type: "40 ISO TANKER",
  //     abbr: "4I",
  //   },
  //   {
  //     type: "45 HC",
  //     abbr: "45",
  //   },
  // ];

  const DEFAULT_FORM_VALUES = {
    bookingNo: null,
    containers: [
      {
        containerNo: "",
        containerType: containerDataType[0],
        sealNo: "",
        noOfPackages: 0,
        grossWt: 0,
        netWt: 0,
        cbm: 0,
      },
    ],
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const onError = (errors: any, e: any) => console.log(errors, e);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "containers",
  });

  React.useEffect(() => {
    dispatch(getBookings(true));
    dispatch(getContainerType(true));
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
    if (currentBooking && containerDataType) {
      const containers: any[] = [];
      currentBooking.containers.map((cnt) => {
        const newObj = { ...cnt };

        const cntType = containerDataType.filter((typ) => {
          return typ._id === cnt.containerType;
        });
        newObj.containerType = cntType[0];
        containers.push(newObj);

        return cnt;
      });
      if (containers.length > 0) {
        const newObj = {
          bookingNo: { ...currentBooking },
          containers: containers,
        };
        setEditCntValues(newObj);
      }
    }
  }, [currentBooking, containerDataType]);

  React.useEffect(() => {
    if (editCntValues) {
      console.log("editCntValues ==.", editCntValues);
      setValue("bookingNo", editCntValues.bookingNo);
      setValue("containers", editCntValues.containers);
    }
  }, [editCntValues]);

  const onSubmit = (data: FormValues, event: any) => {
    event.preventDefault();

    if (!data.containers || data.containers.length === 0) {
      enqueueSnackbar("Please  add atleast one container details to save", {
        variant: "error",
      });
      return;
    }
    console.log("data ===>", data);
    data.containers.map((cnt) => {
      cnt.containerType = cnt.containerType._id;
    });
    const booking: any = {
      _id: data.bookingNo._id,
      containers: data.containers,
    };
    if (bookingId) {
      booking._id = bookingId;
      dispatch(updateBooking(booking, "CONTAINER"));
      navigate("/booking");
    } else {
      dispatch(updateBooking(booking, "CONTAINER"));
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
            <Tooltip title="Add More Containers">
              <Fab
                color="success"
                size="small"
                onClick={() =>
                  append({
                    containerNo: "",
                    containerType: containerDataType[0],
                    sealNo: "",
                    noOfPackages: 0,
                    grossWt: 0,
                    netWt: 0,
                    cbm: 0,
                  })
                }
              >
                <Add />
              </Fab>
            </Tooltip>
          </Grid>

          <Grid item xs={12}>
            {fields.map((item, index) => (
              <Grid container spacing={1} key={item.id}>
                <Grid item xs={12} md={1.5}>
                  <TextField
                    label="Container No"
                    {...register(`containers.${index}.containerNo`, {
                      required: true,
                      pattern: {
                        value: /^[A-Za-z]{4}\d{7}$/,
                        message:
                          "Container must be exactly 11 characters, with the first four being letters and the last seven being numbers",
                      },
                    })}
                    error={!!errors.containers?.[index]?.containerNo}
                    helperText={
                      errors.containers?.[index]?.containerNo?.message
                    }
                    size={"small"}
                    // InputProps={{ inputProps: { min: 11, max: 11} }}
                  />
                </Grid>
                <Grid item xs={12} md={1.5}>
                  <Controller
                    control={control}
                    name={`containers.${index}.containerType`}
                    rules={{ required: true }}
                    defaultValue={item.containerType}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        id="containerType"
                        onChange={(event, value) => {
                          onChange(value);
                        }}
                        value={value}
                        options={containerDataType}
                        getOptionLabel={(option) =>
                          option.type ? option.type : ""
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.type === value.type
                        }
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            label="Container Type"
                            error={!!errors.containers?.[index]?.containerType}
                            helperText={
                              errors.containers?.[index]?.containerType
                                ?.message && "Container Type is required"
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
                    label="Seal No"
                    {...register(`containers.${index}.sealNo`, {
                      required: true,
                    })}
                    error={!!errors.containers?.[index]?.sealNo}
                    helperText={errors.containers?.[index]?.sealNo?.message}
                    size={"small"}
                  />
                </Grid>
                <Grid item xs={12} md={1.5}>
                  <TextField
                    label="No of Packages"
                    {...register(`containers.${index}.noOfPackages`, {
                      required: true,
                    })}
                    error={!!errors.containers?.[index]?.noOfPackages}
                    helperText={
                      errors.containers?.[index]?.noOfPackages?.message
                    }
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                    size={"small"}
                  />
                </Grid>
                <Grid item xs={12} md={1.5}>
                  <TextField
                    label="Gross Wt"
                    {...register(`containers.${index}.grossWt`, {
                      required: true,
                    })}
                    error={!!errors.containers?.[index]?.grossWt}
                    helperText={errors.containers?.[index]?.grossWt?.message}
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    size={"small"}
                  />
                </Grid>
                <Grid item xs={12} md={1.5}>
                  <TextField
                    label="Net Wt"
                    {...register(`containers.${index}.netWt`)}
                    // error={!!errors.containers?.[index]?.netWt}
                    // helperText={errors.containers?.[index]?.netWt?.message}
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    size={"small"}
                  />
                </Grid>
                <Grid item xs={12} md={1.5}>
                  <TextField
                    label="CBM"
                    {...register(`containers.${index}.cbm`)}
                    // error={!!errors.containers?.[index]?.cbm}
                    // helperText={errors.containers?.[index]?.cbm?.message}
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    size={"small"}
                  />

                  {/* <Button type="button" onClick={() => remove(index)}>
                Remove
              </Button> */}
                </Grid>
                <Grid item xs={12} md={1}>
                  {/* {index !== 0 && ( */}
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Tooltip title="Remove Container">
                      <Fab
                        color="error"
                        size="small"
                        onClick={() => remove(index)}
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
          {/* <Button
            type="button"
            onClick={() =>
              append({
                containerNo: "",
                containerType: "",
                sealNo: "",
                noOfPackages: 0,
                grossWt: 0,
                netWt: 0,
                cbm: 0,
              })
            }
          >
            Add Phone Number
          </Button> */}

          {/* <Button type="submit">Submit</Button> */}

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

export default AddContainer;
