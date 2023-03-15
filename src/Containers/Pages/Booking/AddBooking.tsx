import React from "react";
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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import {
  addNewBooking,
  getBookingById,
  updateBooking,
} from "../../../Store/Actions/BookingActions";
import { bookingActions } from "../../../Store/Reducers/BookingReducer";

import { Cancel, Save } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import {
  getCustomerVendors,
  getVendors,
} from "../../../Store/Actions/CustomerVendorActions";
import { getSeaPorts } from "../../../Store/Actions/SeaPortsActions";
import { getCommodity } from "../../../Store/Actions/CommodityActions";

interface IAddBooking {
  id?: string;
}

const AddBooking: React.FC<IAddBooking> = ({ id }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const newState = location.state as IAddBooking;
  const bookingId: any = newState?.id;
  const navigate = useNavigate();
  const currentBooking = useAppSelector(
    (state) => state.booking.currentBooking
  );
  const currentProfitCenter = useAppSelector(
    (state) => state.profitCenter.currentProfitCenter
  );
  const currentFyear = useAppSelector((state) => state.fyear.currentFyear);
  const customerData = useAppSelector(
    (state) => state.customerVendor.customers
  );

  const [shipperData, setShipperData] = React.useState<any>("");
  const [consigneeData, setConsigneeData] = React.useState<any>("");
  const [notifierData, setNotifierData] = React.useState<any>("");
  const [overseasAgentData, setoverseasAgentData] = React.useState<any>("");
  const [deliveryAgentData, setDeliveryAgentData] = React.useState<any>("");
  const [lineData, setLineData] = React.useState<any>("");
  const [CHAData, setCHAData] = React.useState<any>("");
  const [transporterData, setTransporterData] = React.useState<any>("");

  const vendorData = useAppSelector((state) => state.customerVendor.vendors);

  const portData = useAppSelector((state) => state.seaPorts.seaPorts);
  const commodityData = useAppSelector((state) => state.commodity.commodity);

  const blTermsData = [
    { terms: "Prepaid", abbr: "P" },
    { terms: "Collect", abbr: "C" },
  ];

  const blTypeData = [{ type: "Direct" }, { type: "House" }];

  const currentStatus = useAppSelector((state) => state.booking.status);

  const DEFAULT_FORM_VALUES = {
    noOfPackages: 0,
    grossWt: 0,
    netWt: 0,
    cbm: 0,
    freight: "SFD",
    operation: "EXPORT",
    shipmentType: "FCL",

    shipper: shipperData && shipperData.length > 0 ? shipperData[0] : null,
    consignee:
      consigneeData && consigneeData.length > 0 ? consigneeData[0] : null,
    notifier: notifierData && notifierData.lenght > 0 ? notifierData[0] : null,
    overseasAgent:
      overseasAgentData && overseasAgentData.length > 0
        ? overseasAgentData[0]
        : null,
    deliveryAgent:
      deliveryAgentData && deliveryAgentData.length > 0
        ? deliveryAgentData[0]
        : null,
    line: lineData && lineData.length > 0 ? lineData[0] : null,
    CHA: CHAData && CHAData.length > 0 ? CHAData[0] : null,
    transporter:
      transporterData && transporterData.length > 0 ? transporterData[0] : null,
    pol: portData && portData.length > 0 ? portData[0] : null,
    pod: portData && portData.length > 0 ? portData[0] : null,
    commodity:
      commodityData && commodityData.length > 0 ? commodityData[0] : null,
    mblTerms: blTermsData && blTermsData.length > 0 ? blTermsData[0] : null,
    hblTerms: blTermsData && blTermsData.length > 0 ? blTermsData[0] : null,
    blType: blTypeData && blTypeData.length > 0 ? blTypeData[0] : null,
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

  React.useEffect(() => {
    dispatch(getCustomerVendors("CUSTOMER", true));
    dispatch(getVendors("VENDOR", true));

    dispatch(getSeaPorts(true));
    dispatch(getCommodity(true));
  }, [dispatch]);

  React.useEffect(() => {
    if (currentStatus && currentStatus.type === "success") {
      reset();
    }
  }, [currentStatus, reset]);

  React.useEffect(() => {
    if (customerData && customerData.length > 0) {
      const shippers = customerData.filter((customer) => customer.isShipper);
      setShipperData(shippers);

      const consignees = customerData.filter(
        (customer) => customer.isConsignee
      );
      setConsigneeData(consignees);

      const notifiers = customerData.filter((customer) => customer.isNotifier);
      setNotifierData(notifiers);

      const oagents = customerData.filter(
        (customer) => customer.isOverseasAgent
      );
      setoverseasAgentData(oagents);
    }
  }, [customerData]);

  React.useEffect(() => {
    if (vendorData && vendorData.length > 0) {
      const lines = vendorData.filter((customer) => customer.isLine);
      setLineData(lines);

      const chas = vendorData.filter((customer) => customer.isCHA);
      setCHAData(chas);

      const transporters = vendorData.filter(
        (customer) => customer.isTransporter
      );
      setTransporterData(transporters);

      const dagents = vendorData.filter((customer) => customer.isDeliveryAgent);
      setDeliveryAgentData(dagents);
    }
  }, [vendorData]);

  React.useEffect(() => {
    if (bookingId) {
      dispatch(getBookingById(bookingId));
    } else {
      dispatch(bookingActions.fetchBookingById({ booking: null }));
    }
  }, [bookingId, dispatch]);

  React.useEffect(() => {
    if (currentBooking) {
      console.log("currentBooking ===>", currentBooking);
      setValue("shipper", currentBooking.shipper);
      setValue("consignee", currentBooking.consignee);
      setValue("notifier", currentBooking.notifier);
      setValue("line", currentBooking.line);
      setValue("overseasAgent", currentBooking.overseasAgent);
      setValue("deliveryAgent", currentBooking.deliveryAgent);
      setValue("transporter", currentBooking.transporter);
      setValue("CHA", currentBooking.CHA);
      setValue("commodity", currentBooking.commodity);
      setValue("pol", currentBooking.pol);
      setValue("pod", currentBooking.pod);

      setValue("finalDestination", currentBooking.finalDestination);
      setValue("blNo", currentBooking.blNo);
      const bltype = blTypeData.filter(
        (bltype) => bltype.type === currentBooking.blType
      );
      setValue("blType", bltype[0]);
      const mblterms = blTermsData.filter(
        (blterm) => blterm.terms === currentBooking.mblTerms
      );
      setValue("mblTerms", mblterms[0]);
      const hblterms = blTermsData.filter(
        (blterm) => blterm.terms === currentBooking.hblTerms
      );
      setValue("hblTerms", hblterms[0]);
      setValue("vessel", currentBooking.vessel);
      setValue("voyage", currentBooking.voyage);
      setValue("noOfPackages", currentBooking.noOfPackages);
      setValue("grossWt", currentBooking.grossWt);
      setValue("netWt", currentBooking.netWt);
      setValue("cbm", currentBooking.cbm);
      setValue("description", currentBooking.description);
      setValue("remarks", currentBooking.remarks);

      setValue("ourRefNo", currentBooking.ourRefNo);
      setValue("exrate", currentBooking.exrate);
    }
  }, [currentBooking]);

  const submitHandler = (data: any, event: any) => {
    event.preventDefault();

    console.log("data ===>", data);
    const booking = { ...data };
    booking.blType = data.blType ? data.blType.type : null;
    booking.mblTerms = data.mblTerms ? data.mblTerms.terms : null;
    booking.hblTerms = data.hblTerms ? data.hblTerms.terms : null;

    booking.shipper = data.shipper ? data.shipper._id : null;
    booking.consignee = data.consignee ? data.consignee._id : null;
    booking.notifier = data.notifier ? data.notifier._id : null;
    booking.overseasAgent = data.overseasAgent ? data.overseasAgent._id : null;
    booking.deliveryAgent = data.deliveryAgent ? data.deliveryAgent._id : null;
    booking.transporter = data.transporter ? data.transporter._id : null;
    booking.line = data.line ? data.line._id : null;
    booking.CHA = data.CHA ? data.CHA._id : null;
    booking.commodity = data.commodity ? data.commodity._id : null;
    booking.pod = data.pod ? data.pod._id : null;
    booking.pol = data.pol ? data.pol._id : null;

    console.log("booking data ===>", booking);
    booking.fyear = currentFyear?._id;
    booking.pc_code = currentProfitCenter?._id;

    if (bookingId) {
      booking._id = bookingId;
      dispatch(updateBooking(booking, "GENERAL"));
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
        onSubmit={handleSubmit(submitHandler, onError)}
        style={{ marginTop: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <label>Select Freight</label>
            <Controller
              render={({ field }) => (
                <RadioGroup
                  row
                  aria-label="AFD / SFD"
                  {...field}
                  defaultValue="SFD"
                >
                  <FormControlLabel
                    value="SFD"
                    control={<Radio />}
                    label="SFD"
                  />
                  <FormControlLabel
                    value="AFD"
                    control={<Radio />}
                    label="AFD"
                  />
                </RadioGroup>
              )}
              name="freight"
              control={control}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <label>Select Operation</label>
            <Controller
              render={({ field }) => (
                <RadioGroup
                  row
                  aria-label="Import / Export"
                  {...field}
                  defaultValue="EXPORT"
                >
                  <FormControlLabel
                    value="IMPORT"
                    control={<Radio />}
                    label="Import"
                  />
                  <FormControlLabel
                    value="EXPORT"
                    control={<Radio />}
                    label="Export"
                  />
                </RadioGroup>
              )}
              name="operation"
              control={control}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <label>Select Shipment Type</label>
            <Controller
              render={({ field }) => (
                <RadioGroup
                  row
                  aria-label="FCL / LCL"
                  {...field}
                  defaultValue="FCL"
                >
                  <FormControlLabel
                    value="FCL"
                    control={<Radio />}
                    label="FCL"
                  />
                  <FormControlLabel
                    value="LCL"
                    control={<Radio />}
                    label="LCL"
                  />
                </RadioGroup>
              )}
              name="shipmentType"
              control={control}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <Controller
              control={control}
              name="bookingNo"
              defaultValue="BE23000001"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="bookingNo"
                  label="Booking #"
                  error={!!errors.bookingNo}
                  helperText={errors.bookingNo && "Booking No is required!"}
                  type="text"
                  required
                  // disabled
                  sx={{
                    color: "blue",
                  }}
                />
              )}
            /> */}
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item container spacing={2}>
              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="shipper"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="shipper"
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      value={value}
                      options={shipperData}
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.name === value.name
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

              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="consignee"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="consignee"
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      options={consigneeData}
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                      }
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="Consignee"
                          error={!!errors.consignee}
                          helperText={
                            errors.consignee && "Consignee is required"
                          }
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="notifier"
                  // rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="notifier"
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      options={notifierData}
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                      }
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="Notifier"
                          // error={!!errors.notifier}
                          // helperText={errors.notifier && "Notifier is required"}
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="line"
                  // rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="line"
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      options={lineData}
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                      }
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="Line"
                          // error={!!errors.line}
                          // helperText={errors.line && "Line is required"}
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="overseasAgent"
                  // rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="overseasAgent"
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      options={overseasAgentData}
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                      }
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="Overseas Agent"
                          // error={!!errors.overseasAgent}
                          // helperText={errors.overseasAgent && "Overseas Agent is required"}
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="deliveryAgent"
                  // rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="deliveryAgent"
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      options={deliveryAgentData}
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                      }
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="Delivery Agent"
                          // error={!!errors.dagent}
                          // helperText={errors.dagent && "Delivery Agent is required"}
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="transporter"
                  // rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="transporter"
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      options={transporterData}
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                      }
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="Transporter"
                          // error={!!errors.transporter}
                          // helperText={errors.transporter && "Transporter is required"}
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="CHA"
                  // rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="CHA"
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      options={CHAData}
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                      }
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="CHA"
                          // error={!!errors.CHA}
                          // helperText={errors.CHA && "CHA is required"}
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="ourRefNo"
                  defaultValue=""
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="ourRefNo"
                      label="Our Ref #"
                      // required
                      // error={!!errors.blNo}
                      // helperText={errors.blNo && "BLNO is required!"}
                      size="small"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="exrate"
                  defaultValue=""
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="exrate"
                      label="ExRate"
                      // required
                      // error={!!errors.blNo}
                      // helperText={errors.blNo && "BLNO is required!"}
                      size="small"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item container spacing={2}>
              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="pol"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="pol"
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
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
                          label="POL"
                          error={!!errors.pol}
                          helperText={errors.pol && "POL is required"}
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="pod"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="pod"
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
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
                          label="POD"
                          error={!!errors.pol}
                          helperText={errors.pol && "POD is required"}
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="finalDestination"
                  defaultValue=""
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="finalDestination"
                      label="Final Destination"
                      // required
                      // error={!!errors.blno}
                      // helperText={errors.blno && "BLNO is required!"}
                      size="small"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name="blNo"
                  defaultValue=""
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="blNo"
                      label="BL #"
                      // required
                      // error={!!errors.blNo}
                      // helperText={errors.blNo && "BLNO is required!"}
                      size="small"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name="blType"
                  // rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="blType"
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      options={blTypeData}
                      getOptionLabel={(option) =>
                        option.type ? option.type : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.type === value.type
                      }
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="BL Type"
                          // error={!!errors.blType}
                          // helperText={errors.blType && "BL Type is required"}
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name="mblTerms"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="mblTerms"
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      options={blTermsData}
                      getOptionLabel={(option) =>
                        option.terms ? option.terms : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.terms === value.terms
                      }
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="MBL Terms"
                          error={!!errors.mblTerms}
                          helperText={
                            errors.mblTerms && "MBL Terms is required"
                          }
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name="hblTerms"
                  // rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="hblTerms"
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      options={blTermsData}
                      getOptionLabel={(option) =>
                        option.terms ? option.terms : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.terms === value.terms
                      }
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="HBL Terms"
                          // error={!!errors.hblTerms}
                          // helperText={errors.hblTerms && "HBL Terms is required"}
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="commodity"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="commodity"
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      options={commodityData}
                      getOptionLabel={(option) =>
                        option.commodityName ? option.commodityName : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.commodityName === value.commodityName
                      }
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="Commodity"
                          error={!!errors.commodity}
                          helperText={
                            errors.commodity && "Commodity is required"
                          }
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="vessel"
                  defaultValue=""
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="vessel"
                      label="Vessel"
                      // required
                      // error={!!errors.vessel}
                      // helperText={errors.vessel && "Vessel is required!"}
                      size="small"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name="voyage"
                  defaultValue=""
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="voyage"
                      label="Voyage"
                      // required
                      // error={!!errors.voyage}
                      // helperText={errors.voyage && "Voyage is required!"}
                      size="small"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name="noOfPackages"
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="noOfPackages"
                      label="# of Packages"
                      required
                      error={!!errors.noOfPackages}
                      helperText={
                        errors.noOfPackages && "Number of packages is required!"
                      }
                      size="small"
                      type="number"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name="grossWt"
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="grossWt"
                      label="Gross Wt"
                      required
                      error={!!errors.grossWt}
                      helperText={errors.grossWt && "Gross Wt is required!"}
                      size="small"
                      type="number"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name="netWt"
                  defaultValue=""
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="netWt"
                      label="Net Wt"
                      // required
                      // error={!!errors.netWt}
                      // helperText={errors.grossWt && "Net Wt is required!"}
                      size="small"
                      type="number"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name="cbm"
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="cbm"
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
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="description"
              defaultValue=""
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="description"
                  label="Description"
                  size="small"
                  multiline
                  rows={5}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="remarks"
              defaultValue=""
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="remarks"
                  label="Remarks"
                  size="small"
                  multiline
                  rows={5}
                />
              )}
            />
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

export default AddBooking;
