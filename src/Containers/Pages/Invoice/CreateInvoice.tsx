import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Autocomplete,
  Switch,
  FormGroup,
} from "@mui/material";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import {
  addNewInvoice,
  getInvoiceById,
  updateInvoice,
} from "../../../Store/Actions/InvoiceActions";
import { invoiceActions } from "../../../Store/Reducers/InvoiceReducer";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Cancel, Close, Save } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import {
  getCustomerVendors,
  getVendors,
} from "../../../Store/Actions/CustomerVendorActions";
import CustomDialog from "../../../Components/CustomDialog";
import { getBookings } from "../../../Store/Actions/BookingActions";
import PreviewInvoice from "./PreviewInvoice";
import moment from "moment";
import { useSnackbar } from "notistack";


interface IAddInvoice {
  id?: string;
}

const AddInvoice: React.FC<IAddInvoice> = ({ id }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const newState = location.state as IAddInvoice;
  const invoiceId: any = newState?.id;
  const navigate = useNavigate();
  const currentInvoice = useAppSelector(
    (state) => state.invoice.currentInvoices
  );
  const currentProfitCenter = useAppSelector(
    (state) => state.profitCenter.currentProfitCenter
  );
  const currentFyear = useAppSelector((state) => state.fyear.currentFyear);
  const customerData = useAppSelector(
    (state) => state.customerVendor.customers
  );
  const [isFinalled, setIsFinalled] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const vendorData = useAppSelector((state) => state.customerVendor.vendors);
  const bookingData = useAppSelector((state) => state.booking.bookings);
  const lastSavedRecord = useAppSelector(
    (state) => state.invoice.lastSavedRecord
  );

  const currentStatus = useAppSelector((state) => state.invoice.status);

  const DEFAULT_FORM_VALUES = {
    invoiceCategory: "CUSTOMER",
    invoiceDate: moment()
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<any>({
    defaultValues: DEFAULT_FORM_VALUES,
  });
  const onError = (errors: any, e: any) => console.log(errors, e);
  const category = useWatch({ control, name: "invoiceCategory" });
  // const [initialCategory, setInitialCategory] = useState("CUSTOMER");

  React.useEffect(() => {
    dispatch(getCustomerVendors("CUSTOMER", true));
    dispatch(getVendors("VENDOR", true));

    dispatch(getBookings(true));
  }, [dispatch]);

  React.useEffect(() => {
    if (currentStatus && currentStatus.type === "success") {
      reset();
    }
  }, [currentStatus, reset]);

  React.useEffect(() => {
    if (invoiceId) {
      dispatch(getInvoiceById(invoiceId));
    } else {
      dispatch(invoiceActions.fetchInvoiceById({ invoice: null }));
    }
  }, [invoiceId, dispatch]);

  const handleCloseDialog = () => {
    dispatch(invoiceActions.setPrintInvoice({ contract: null }));
    dispatch(invoiceActions.setLastSavedRecord(null));
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

  React.useEffect(() => {
    if (currentInvoice) {
      console.log("currentInvoice ===>", currentInvoice);
      //   setValue("shipper", currentInvoice.shipper);
      //   setValue("consignee", currentInvoice.consignee);
      //   setValue("notifier", currentInvoice.notifier);
      //   setValue("line", currentInvoice.line);
      //   setValue("overseasAgent", currentInvoice.overseasAgent);
      //   setValue("deliveryAgent", currentInvoice.deliveryAgent);
      //   setValue("transporter", currentInvoice.transporter);
      //   setValue("CHA", currentInvoice.CHA);
      //   setValue("commodity", currentInvoice.commodity);
      //   setValue("pol", currentInvoice.pol);
      //   setValue("pod", currentInvoice.pod);

      //   setValue("finalDestination", currentInvoice.finalDestination);
      //   setValue("blNo", currentInvoice.blNo);
      //   const bltype = blTypeData.filter(
      //     (bltype) => bltype.type === currentInvoice.blType
      //   );
      //   setValue("blType", bltype[0]);
      //   const mblterms = blTermsData.filter(
      //     (blterm) => blterm.terms === currentInvoice.mblTerms
      //   );
      //   setValue("mblTerms", mblterms[0]);
      //   const hblterms = blTermsData.filter(
      //     (blterm) => blterm.terms === currentInvoice.hblTerms
      //   );
      //   setValue("hblTerms", hblterms[0]);
      //   setValue("vessel", currentInvoice.vessel);
      //   setValue("voyage", currentInvoice.voyage);
      //   setValue("noOfPackages", currentInvoice.noOfPackages);
      //   setValue("grossWt", currentInvoice.grossWt);
      //   setValue("netWt", currentInvoice.netWt);
      //   setValue("cbm", currentInvoice.cbm);
      //   setValue("description", currentInvoice.description);
      //   setValue("remarks", currentInvoice.remarks);
    }
  }, [currentInvoice]);

  const submitHandler = (data: any, event: any) => {
    event.preventDefault();

    console.log("data ===>", data);
    const invoice = { ...data };

    if(data.invoiceCategory === "CUSTOMER" && data.bookingNo.sellRate.length === 0){
      enqueueSnackbar("Unable to save! Please enter the sellrate first.", {
        variant: "error",
      });
      return;
    }

    if(data.invoiceCategory === "VENDOR" && data.bookingNo.buyRate.length === 0){
      enqueueSnackbar("Unable to save! Please enter the buyrate first.", {
        variant: "error",
      });
      return;
    }


    invoice.fyear = currentFyear?._id;
    invoice.pc_code = currentProfitCenter?._id;

    invoice.billingParty = invoice.billingParty._id;
    invoice.bookingNo = invoice.bookingNo._id;
    invoice.isFinalled = false;
    invoice.finalledAt = false;
    invoice.billingTo = invoice.invoiceCategory;
    invoice.invoiceDate = invoice.invoiceDate;

    console.log("invoice data ===>", invoice);

    if (invoiceId) {
      invoice._id = invoiceId;
      dispatch(updateInvoice(invoice, "GENERAL"));
      navigate("/invoice");
    } else {
      dispatch(addNewInvoice(invoice));
    }
  };

  const cancelHandler = () => {
    reset();

    if (invoiceId) {
      navigate("/invoice");
    }
  };

  // const handleInvoiceCategoryChange = (event: any)=>{

  // }

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <form
        noValidate
        onSubmit={handleSubmit(submitHandler, onError)}
        style={{ marginTop: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <label>Select Invoice Category</label>
            <Controller
              render={({ field }) => (
                <RadioGroup
                  row
                  aria-label="Invoice Category"
                  {...field}
                  defaultValue="CUSTOMER"
                >
                  <FormControlLabel
                    value="CUSTOMER"
                    control={<Radio />}
                    label="CUSTOMER"
                  />
                  <FormControlLabel
                    value="VENDOR"
                    control={<Radio />}
                    label="VENDOR"
                  />
                </RadioGroup>
              )}
              name="invoiceCategory"
              control={control}
            />
          </Grid>

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
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Controller
              control={control}
              name="billingParty"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  id="billingParty"
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  value={value}
                  options={category === "CUSTOMER" ? customerData : vendorData}
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="Billing Party"
                      error={!!errors.billingParty}
                      helperText={
                        errors.billingParty && "Billing To is required"
                      }
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Controller
              control={control}
              name="invoiceDate"
              render={({ field }) => (
                <DesktopDatePicker
                  {...field}
                  label="Invoice Date"
                  inputFormat="DD/MM/yyyy"
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={1}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Controller
                    name="isUSDInvoice"
                    control={control}
                    defaultValue={false}
                    render={({ field: { value, onChange } }) => (
                      <Switch
                      checked={value}
                      onChange={(val) => onChange(val)}
                      />
                    )}
                  />
                }
                label="USD Invoice"
                labelPlacement="start"
              />
            </FormGroup>
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

      {openDialog && (
        <CustomDialog
          maxWidth="xl"
          open={openDialog}
          title="Contract"
          handleClose={handleCloseDialog}
          Content={
            <PreviewInvoice
              id={lastSavedRecord ? lastSavedRecord._id : invoiceId}
            />
          }
          Actions={<DialogActions />}
        />
      )}
    </Container>
  );
};

export default AddInvoice;
