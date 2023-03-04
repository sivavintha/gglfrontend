import React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Container,
  Autocomplete,
  Fab,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import {
  addNewContract,
  getContractById,
  updateContract,
} from "../../../Store/Actions/ContractActions";
import { contractActions } from "../../../Store/Reducers/ContractReducer";

import { Cancel, CheckCircle, Close, Print, Save } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { getEvent } from "../../../Store/Actions/EventActions";
import { getCustomerVendors, getVendors } from "../../../Store/Actions/CustomerVendorActions";
import { getBookings } from "../../../Store/Actions/BookingActions";
import PreviewContract from "./PreviewContract";
import CustomDialog from "../../../Components/CustomDialog";
import { getOrigin } from "../../../Store/Actions/OriginActions";

interface IAddContract {
  id?: string;
}

const AddContract: React.FC<IAddContract> = ({ id }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const newState = location.state as IAddContract;
  const contractId: any = newState?.id;
  const navigate = useNavigate();
  const currentContract = useAppSelector(
    (state) => state.contract.currentContract
  );
  const lastSavedRecord = useAppSelector(
    (state) => state.contract.lastSavedRecord
  );
  const currentStatus = useAppSelector((state) => state.contract.status);
  const eventData = useAppSelector((state) => state.event.event);
  const buyerData = useAppSelector((state) => state.customerVendor.customers);
  const sellerData = useAppSelector((state) => state.customerVendor.vendors);
  const bookingData = useAppSelector((state) => state.booking.bookings);
  const originData = useAppSelector((state) => state.origin.origin);

  const [isFinalled, setIsFinalled] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const DEFAULT_FORM_VALUES = {
    buyer: buyerData[0],
    seller: sellerData[0],
    accountDetails: bookingData[0],
    origin: originData[0],
    event: eventData[0],
  };

  const {
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
    if (
      currentStatus &&
      currentStatus.type === "success" &&
      currentStatus.message !== "Files uploaded successfully!"
    ) {
      reset();
    }
  }, [currentStatus]);

  React.useEffect(() => {
    dispatch(getEvent());
    dispatch(getCustomerVendors("BUYER"));
    dispatch(getVendors("SELLER"));
    dispatch(getBookings());
    dispatch(getOrigin());
  }, []);

  React.useEffect(() => {
    if (contractId) {
      dispatch(getContractById(contractId));
    } else {
      dispatch(contractActions.fetchContractById({ contract: null }));
    }
  }, [contractId]);

  React.useEffect(() => {
    if (currentContract) {
      setValue("buyer", currentContract.buyer);
      setValue("seller", currentContract.seller);
      // setValue("event", currentContract.event);
      setValue("origin", currentContract.origin);
      setValue("paymentTerms", currentContract.paymentTerms);
      setValue("outTurn", currentContract.outTurn);
      setValue("nutCount", currentContract.nutCount);
      setValue("moisture", currentContract.moisture);
      setValue("quantity", currentContract.quantity);
      setValue("packing", currentContract.packing);
      setValue("rate", currentContract.rate);
      setValue("shipmentAdvice", currentContract.shipmentAdvice);
      setValue("accountDetails", currentContract.accountDetails);
      setValue("remarks", currentContract.remarks);
      setValue("cargoLocation", currentContract.cargoLocation);

      if (currentContract.isFinal) {
        setIsFinalled(true);
      } else {
        setIsFinalled(false);
      }
    } else {
      reset(DEFAULT_FORM_VALUES);
    }
  }, [currentContract]);

  const handleCloseDialog = () => {
    dispatch(contractActions.setPrintContract({ contract: null }));
    dispatch(contractActions.setLastSavedRecord(null));
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const DialogActions = () => {
    return (
      <>
        <Button onClick={handleCloseDialog} variant="contained">
          <Close /> Close
        </Button>
      </>
    );
  };

  const onError = (errors: any, e: any) => console.log(errors, e);

  const submitHandler = async (data: any, event: any) => {
    event.preventDefault();
    try {
      console.log("contract data ===>", data);
      await saveRecords(data, false);
    } catch {
      dispatch(
        contractActions.setStatus({
          type: "error",
          message: "Unexpected error while saving contract!",
        })
      );
    }
  };

  const finalContract = async (event: any) => {
    event.preventDefault();
    const data = getValues();
    try {
      await saveRecords(data, true);
    } catch {
      dispatch(
        contractActions.setStatus({
          type: "error",
          message: "Unexpected error while finalling contract!",
        })
      );
    }
  };

  const saveRecords = async (data: any, isFinal: boolean) => {
    const contract = { ...data };

    contract.origin = data.origin._id;
    contract.buyer = data.buyer._id;
    contract.seller = data.seller._id;
    contract.event = data.event._id;
    contract.accountDetails = data.accountDetails._id;
    contract.isFinal = isFinal;

    if (contractId) {
      contract._id = contractId;
      dispatch(updateContract(contract));
      navigate("/contract");
    } else {
      dispatch(addNewContract(contract));
    }

    clear();

    handleOpenDialog();
  };

  const cancelHandler = () => {
    clear();

    if (contractId) {
      navigate("/contract");
    }
  };

  const clear = () => {
    reset();
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />

      <form
        noValidate
        onSubmit={handleSubmit(submitHandler, onError)}
        style={{ marginTop: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={3}>
            <Controller
              control={control}
              name="buyer"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  id="buyer"
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  value={value}
                  options={buyerData}
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  disabled={isFinalled}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="Buyer"
                      error={!!errors.buyer}
                      helperText={errors.buyer && "Buyer is required"}
                      disabled={isFinalled}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Controller
              control={control}
              name="seller"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  id="seller"
                  value={value}
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  options={sellerData}
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  disabled={isFinalled}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="Seller"
                      error={!!errors.buyer}
                      helperText={errors.buyer && "Seller is required"}
                      disabled={isFinalled}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Controller
              control={control}
              name="event"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  id="event"
                  value={value}
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  options={eventData}
                  disabled={isFinalled}
                  getOptionLabel={(option) =>
                    option.eventName ? option.eventName : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.eventName === value.eventName
                  }
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="Event"
                      error={!!errors.event}
                      helperText={errors.event && "Event is required"}
                      disabled={isFinalled}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Controller
              control={control}
              name="origin"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  id="origin"
                  value={value}
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  options={originData}
                  getOptionLabel={(option) =>
                    option.originName ? option.originName : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.originName === value.originName
                  }
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="Origin"
                      error={!!errors.origin}
                      helperText={errors.origin && "Origin is required"}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={1}>
            <Controller
              control={control}
              name="outTurn"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="outTurn"
                  label="Out Turn"
                  error={!!errors.outTurn}
                  helperText={errors.outTurn && "Out Turn is Required!"}
                  type="text"
                  required
                  disabled={isFinalled}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={2}>
            <Controller
              control={control}
              name="nutCount"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="nutCount"
                  label="Nut Count"
                  error={!!errors.nutCount}
                  helperText={errors.nutCount && "Nut count is Required!"}
                  type="text"
                  required
                  disabled={isFinalled}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={1}>
            <Controller
              control={control}
              name="moisture"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="moisture"
                  label="Moisture"
                  disabled={isFinalled}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={1}>
            <Controller
              control={control}
              name="quantity"
              defaultValue=""
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="quantity"
                  label="Quantity"
                  // required
                  // error={!!errors.quantity}
                  // helperText={errors.quantity && "quantity is required!"}
                  disabled={isFinalled}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={2}>
            <Controller
              control={control}
              name="packing"
              // rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="packing"
                  label="Packing"
                  type="text"
                  // error={!!errors.packing}
                  // helperText={errors.packing && "Packing is Required!"}
                  // required
                  disabled={isFinalled}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={2}>
            <Controller
              control={control}
              name="rate"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="rate"
                  label="Price"
                  required
                  error={!!errors.rate}
                  helperText={errors.rate && "Price is required!"}
                  disabled={isFinalled}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Controller
              control={control}
              name="paymentTerms"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="paymentTerms"
                  label="Payment Terms"
                  type="text"
                  error={!!errors.paymentTerms}
                  helperText={
                    errors.paymentTerms && "Payment Terms is Required!"
                  }
                  required
                  disabled={isFinalled}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <Controller
              control={control}
              name="cargoLocation"
              defaultValue=""
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="cargoLocation"
                  label="Cargo Location"
                  // required
                  // error={!!errors.cargoLocation}
                  // helperText={
                  //   errors.cargoLocation && "Cargo Location is required!"
                  // }
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Controller
              control={control}
              name="accountDetails"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  id="accountDetails"
                  value={value}
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  disabled={isFinalled}
                  options={bookingData}
                  getOptionLabel={(option) =>
                    option.accountName ? option.accountName : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.accountName === value.accountName
                  }
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="Booking Details"
                      error={!!errors.accountDetails}
                      helperText={
                        errors.accountDetails && "Booking Details is required"
                      }
                      disabled={isFinalled}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Controller
              control={control}
              name="shipmentAdvice"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="shipmentAdvice"
                  label="Shipment Advice"
                  type="text"
                  multiline
                  minRows={1}
                  maxRows={2}
                  disabled={isFinalled}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Controller
              control={control}
              name="remarks"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="remarks"
                  label="Remarks"
                  type="text"
                  multiline
                  minRows={1}
                  maxRows={2}
                  disabled={isFinalled}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6} lg={2}>
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

            <Grid item xs={12} sm={6} lg={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                startIcon={<Save />}
                disabled={isFinalled}
              >
                Save
              </Button>
            </Grid>

            <Grid item xs={12} sm={6} lg={2}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                type="button"
                startIcon={<CheckCircle />}
                onClick={(e: any) => finalContract(e)}
                disabled={!contractId || isFinalled}
              >
                Final
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>

      {openDialog && (
        <CustomDialog
          maxWidth="xl"
          open={openDialog}
          title="Contract"
          handleClose={handleCloseDialog}
          Content={
            <PreviewContract
              id={lastSavedRecord ? lastSavedRecord._id : contractId}
            />
          }
          Actions={<DialogActions />}
        />
      )}
    </Container>
  );
};

export default AddContract;
