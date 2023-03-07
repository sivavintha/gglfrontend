import React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Container,
  Fab,
  FormControlLabel,
  Radio,
  RadioGroup,
  Autocomplete,
} from "@mui/material";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import {
  addNewBooking,
  getBookingById,
  updateBooking,
} from "../../../Store/Actions/BookingActions";
import { bookingActions } from "../../../Store/Reducers/BookingReducer";

import { Add, Cancel, Remove, Save } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";

interface IAddContainer {
  id?: string;
}

const AddContainer: React.FC<IAddContainer> = ({ id }) => {
  const DEFAULT_FORM_VALUES = {
    bookingNo: "",
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<any>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const dispatch = useAppDispatch();
  const location = useLocation();
  const newState = location.state as IAddContainer;
  const bookingId: any = newState?.id;
  const navigate = useNavigate();
  const currentBooking = useAppSelector(
    (state) => state.booking.currentBooking
  );
  const shipperData = useAppSelector((state) => state.event.event);
  const consigneeData = useAppSelector((state) => state.event.event);
  const notifierData = useAppSelector((state) => state.event.event);
  const lineData = useAppSelector((state) => state.event.event);
  const transporterData = useAppSelector((state) => state.event.event);
  const CHAData = useAppSelector((state) => state.event.event);
  const oAgentData = useAppSelector((state) => state.event.event);
  const polData = useAppSelector((state) => state.event.event);
  const podData = useAppSelector((state) => state.event.event);
  const deliveryAgentData = useAppSelector((state) => state.event.event);
  const containerTypeData = useAppSelector((state) => state.event.event);
  const commodityData = useAppSelector((state) => state.event.event);

  const blTermsData = [
    { terms: "Prepaid", abbr: "P" },
    { terms: "Collect", abbr: "C" },
  ];
  const blTypeData = [{ type: "Direct" }, { type: "House" }];

  const currentStatus = useAppSelector((state) => state.booking.status);

  React.useEffect(() => {
    if (
      currentStatus &&
      currentStatus.type === "success" &&
      currentStatus.message !== "Files uploaded successfully!"
    ) {
      reset();
    }
  }, [currentStatus]);

  React.useEffect(() => {
    if (bookingId) {
      dispatch(getBookingById(bookingId));
    } else {
      dispatch(bookingActions.fetchBookingById({ booking: null }));
    }
  }, [bookingId]);

  // React.useEffect(() => {
  //   if (currentBooking) {
  //     setValue("shipper", currentBooking.shipper);
  //     setValue("consignee", currentBooking.consignee);
  //     setValue("bookingName", currentBooking.bookingName);
  //     setValue("bookingBranch", currentBooking.bookingBranch);
  //     setValue("ifscCode", currentBooking.ifscCode);
  //     setValue("swiftCode", currentBooking.swiftCode);
  //     setValue("branch", currentBooking.branch);
  //   } else {
  //     reset(DEFAULT_FORM_VALUES);
  //   }
  // }, [currentBooking]);

  const submitHandler = (data: any, event: any) => {
    event.preventDefault();
    const booking = { ...data };

    if (bookingId) {
      booking._id = bookingId;
      dispatch(updateBooking(booking));
      navigate("/booking");
    } else {
      dispatch(addNewBooking(booking));
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
          <Grid item xs={12} md={6}>
            <Grid item container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="shipper"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="shipper"
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      options={shipperData}
                      getOptionLabel={(option) =>
                        option.eventName ? option.eventName : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.eventName === value.eventName
                      }
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="Shipper"
                          error={!!errors.shipper}
                          helperText={errors.shipper && "Shipper is required"}
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12}>
            <fieldset>
              <legend>Container Details</legend>
              <Grid item container spacing={2}>
                <Grid item xs={12} md={2}>
                  <Controller
                    control={control}
                    name="container"
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="container"
                        label="Container #"
                        required
                        error={!!errors.container}
                        helperText={
                          errors.container && "Container is required!"
                        }
                        size="small"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={2}>
                  <Controller
                    control={control}
                    name="containerType"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        id="containerType"
                        value={value}
                        onChange={(event, item) => {
                          onChange(item);
                        }}
                        options={containerTypeData}
                        getOptionLabel={(option) =>
                          option.eventName ? option.eventName : ""
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.eventName === value.eventName
                        }
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            label="Container Type"
                            error={!!errors.containerType}
                            helperText={
                              errors.containerType &&
                              "Container Type is required"
                            }
                            size="small"
                          />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={2}>
                  <Controller
                    control={control}
                    name="sealNo"
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="sealNo"
                        label="Seal #"
                        // required
                        // error={!!errors.sealNo}
                        // helperText={
                        //   errors.sealNo && "Seal No is required!"
                        // }
                        size="small"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={2}>
                  <Controller
                    control={control}
                    name="containerNoOfPackages"
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="containerNoOfPackages"
                        label="# of Packages"
                        required
                        error={!!errors.containerNoOfPackages}
                        helperText={
                          errors.containerNoOfPackages &&
                          "Number of packages is required!"
                        }
                        size="small"
                        type="number"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={2}>
                  <Controller
                    control={control}
                    name="containerGrossWt"
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="containerGrossWt"
                        label="Gross Wt"
                        required
                        error={!!errors.containerGrossWt}
                        helperText={
                          errors.containerGrossWt && "Gross Wt is required!"
                        }
                        size="small"
                        type="number"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={1}>
                  <Controller
                    control={control}
                    name="containercbm"
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="containercbm"
                        label="CBM"
                        // required
                        // error={!!errors.netWt}
                        // helperText={errors.grossWt && "Net Wt is required!"}
                        size="small"
                        type="number"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={1}>
                  <Fab color="primary" aria-label="add" size="small">
                    <Add />
                  </Fab>
                  <Fab color="primary" aria-label="add" size="small">
                    <Remove />
                  </Fab>
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

export default AddContainer;
