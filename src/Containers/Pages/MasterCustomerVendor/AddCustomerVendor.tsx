import React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Switch,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import {
  addNewCustomerVendor,
  getCustomerVendorById,
  updateCustomerVendor,
} from "../../../Store/Actions/CustomerVendorActions";
import { customerVendorActions } from "../../../Store/Reducers/CustomerVendorReducer";

import CountryList from "../../../Helpers/countryList";
import CountrySelector from "../../../Components/CountrySelector";
import { Cancel, Save } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import IndianStatesList from "../../../Helpers/StatesList";
import StateSelector from "../../../Components/IndianStatesSelector";
import { useSnackbar } from "notistack";

interface IAddCustomerVendor {
  id?: string;
}

const AddCustomerVendor: React.FC<IAddCustomerVendor> = () => {
  const [countryValue, setCountryValue] = React.useState<any | null>(
    CountryList[103]
  );
  const [countryInputValue, setCountryInputValue] = React.useState("");

  const [stateValue, setStateValue] = React.useState<any | null>(
    IndianStatesList[26]
  );
  const [stateInputValue, setStateInputValue] = React.useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const DEFAULT_FORM_VALUES = {
    name: "",
    emailId: "",
    mobileNumber: "",
    category: "CUSTOMER",
    geoCode: "91",
    country: countryValue,
    states: stateValue,
    state: "",
    isShipper: true,
    creditDays: 0,
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

  const dispatch = useAppDispatch();
  const location = useLocation();
  const newState = location.state as IAddCustomerVendor;
  const customerVendorId: any = newState?.id;
  const navigate = useNavigate();
  const currentCustomerVendor = useAppSelector(
    (state) => state.customerVendor.currentCustomerVendor
  );
  const currentStatus = useAppSelector((state) => state.customerVendor.status);
  const currentProfitCenter = useAppSelector(
    (state) => state.profitCenter.currentProfitCenter
  );

  const onError = (errors: any, e: any) => console.log(errors, e);

  React.useEffect(() => {
    if (currentStatus && currentStatus.type === "success") {
      reset();
    }
  }, [currentStatus]);

  React.useEffect(() => {
    if (customerVendorId) {
      dispatch(getCustomerVendorById(customerVendorId));
    } else {
      dispatch(
        customerVendorActions.fetchCustomerVendorById({ customerVendor: null })
      );
    }
  }, [customerVendorId]);

  React.useEffect(() => {
    if (currentCustomerVendor) {
      let country = CountryList.filter(
        (country) =>
          country.label.toLowerCase() ===
          currentCustomerVendor.country.toLowerCase()
      );

      setCountryValue(country[0]);
      setCountryInputValue(country[0].label);
      setValue("country", country[0]);

      if (country[0].label === "India") {
        let states = IndianStatesList.filter(
          (state) =>
            state.label.toLowerCase() ===
            currentCustomerVendor.state.toLowerCase()
        );
        setStateValue(states[0]);
        setStateInputValue(states[0].label);
        setValue("states", states[0]);
      } else {
        setValue("state", currentCustomerVendor.state);
      }

      setValue("name", currentCustomerVendor.name);
      setValue("emailId", currentCustomerVendor.emailId);
      setValue("geoCode", currentCustomerVendor.geoCode);
      setValue("mobileNumber", currentCustomerVendor.mobileNumber);
      setValue("address1", currentCustomerVendor.address1);
      setValue("address2", currentCustomerVendor.address2);
      setValue("city", currentCustomerVendor.city);
      setValue("zipcode", currentCustomerVendor.zipcode);
      setValue("gstInNumber", currentCustomerVendor.gstInNumber);
      setValue("category", currentCustomerVendor.category);
      setValue("creditDays", currentCustomerVendor.creditDays | 0);

      setValue("isShipper", currentCustomerVendor.isShipper);
      setValue("isConsignee", currentCustomerVendor.isConsignee);
      setValue("isNotifier", currentCustomerVendor.isNotifier);
      setValue("isOverseasAgent", currentCustomerVendor.isOverseasAgent);
      setValue("isCHA", currentCustomerVendor.isCHA);
      setValue("isLine", currentCustomerVendor.isLine);
      setValue("isTransporter", currentCustomerVendor.isTransporter);
      setValue("isSupplier", currentCustomerVendor.isSupplier);
      setValue("isDeliveryAgent", currentCustomerVendor.isDeliveryAgent);
      setValue("isWarehouse", currentCustomerVendor.isWarehouse);
    } else {
      reset(DEFAULT_FORM_VALUES);
    }
  }, [currentCustomerVendor]);

  const submitHandler = (data: any, event: any) => {
    event.preventDefault();
    if (
      !data.isShipper &&
      !data.isConsignee &&
      !data.isNotifier &&
      !data.isOverseasAgent &&
      !data.isCHA &&
      !data.isLine &&
      !data.isTransporter &&
      !data.isSupplier &&
      !data.isDeliveryAgent &&
      !data.isWarehouse
    ) {
      enqueueSnackbar(
        "Please select atleast one customer type.. i.e. shipper, consignee, etc",
        {
          variant: "error",
        }
      );
      return;
    }
    const customerVendor = { ...data };
    customerVendor.country = countryValue.label;
    customerVendor.state =
      customerVendor.country.toLowerCase() === "india"
        ? stateValue.label
        : customerVendor.state;
    customerVendor.stateTin =
      customerVendor.country.toLowerCase() === "india"
        ? stateValue.tin
        : customerVendor.state;

    customerVendor.profitCenter = currentProfitCenter?.profitCenterName;
    delete customerVendor.states;

    if (customerVendorId) {
      customerVendor._id = customerVendorId;
      dispatch(updateCustomerVendor(customerVendor));
      navigate("/master/customervendor");
    } else {
      dispatch(addNewCustomerVendor(customerVendor));
    }
  };

  const cancelHandler = () => {
    reset();

    if (customerVendorId) {
      navigate("/master/customervendor");
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
          <Grid item xs={12}>
            <label>Select Customer / Vendor</label>
            <Controller
              render={({ field }) => (
                <RadioGroup
                  row
                  aria-label="customer/vendor"
                  {...field}
                  defaultValue="CUSTOMER"
                >
                  <FormControlLabel
                    value="CUSTOMER"
                    control={<Radio />}
                    label="Customer"
                  />
                  <FormControlLabel
                    value="VENDOR"
                    control={<Radio />}
                    label="Vendor"
                  />
                </RadioGroup>
              )}
              name="category"
              control={control}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="name"
                  label="Name"
                  error={!!errors.name}
                  helperText={errors.name && "Name is Required!"}
                  type="text"
                  required
                  size={"small"}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Controller
              control={control}
              name="emailId"
              defaultValue=""
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="emailId"
                  label="Email"
                  // error={!!errors.emailId}
                  // helperText={errors.emailId && "Email is Required!"}
                  type="email"
                  // required
                  size={"small"}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              control={control}
              name="country"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <CountrySelector
                  onChange={(event, item) => {
                    setValue("geoCode", item.phone);
                    setStateValue(null);
                    setStateInputValue("");
                    setCountryValue(item);
                  }}
                  error={!!errors.country}
                  value={countryValue}
                  helperText={errors.country && "Country is Required!"}
                  // isOptionEqualToValue={(option: any, value: any) =>
                  //   option.label === value.label
                  // }
                  inputValue={countryInputValue}
                  onInputChange={(event, newInputValue) => {
                    setCountryInputValue(newInputValue);
                  }}
                  size="small"
                />
              )}
            />
          </Grid>

          {countryInputValue === "India" && (
            <Grid item xs={12} md={2}>
              <Controller
                control={control}
                name="states"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <StateSelector
                    onChange={(event, item) => {
                      setStateValue(item);
                    }}
                    error={!!errors.states}
                    // value={stateValue}
                    helperText={errors.states && "States is Required!"}
                    // isOptionEqualToValue={(option: any, value: any) =>
                    //   option.label === value.label
                    // }
                    value={stateValue}
                    size={"small"}
                    inputValue={stateInputValue}
                    onInputChange={(event, newInputValue) => {
                      setStateInputValue(newInputValue);
                    }}
                  />
                )}
              />
            </Grid>
          )}

          {countryInputValue !== "India" && (
            <Grid item xs={12} md={2}>
              <Controller
                control={control}
                name="state"
                defaultValue=""
                // rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="state"
                    label="State"
                    size={"small"}
                    // required
                    // error={!!errors.state}
                    // helperText={errors.state && "State is required!"}
                  />
                )}
              />
            </Grid>
          )}

          <Grid item xs={12} md={2}>
            <Controller
              control={control}
              name="city"
              defaultValue=""
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="city"
                  label="City"
                  size={"small"}
                  // required
                  // error={!!errors.city}
                  // helperText={errors.city && "City is required!"}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Controller
              control={control}
              name="address1"
              defaultValue=""
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="address1"
                  label="Address 1"
                  size={"small"}
                  // required
                  // error={!!errors.address1}
                  // helperText={errors.address1 && "Address1 is required!"}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Controller
              control={control}
              name="address2"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="address2"
                  label="Address 2"
                  size={"small"}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={1}>
            <Controller
              control={control}
              name="zipcode"
              defaultValue=""
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="zipcode"
                  label="Zipcode"
                  // error={!!errors.zipcode}
                  // helperText={errors.zipcode && "Zipcode is required!"}
                  type="text"
                  size={"small"}
                  // required
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={1}>
            <Controller
              control={control}
              name="geoCode"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="geoCode"
                  label="Geo Code"
                  error={!!errors.geoCode}
                  helperText={errors.geoCode && "Geo code is Required!"}
                  type="text"
                  required
                  disabled
                  size={"small"}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Controller
              control={control}
              name="mobileNumber"
              defaultValue=""
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="mobileNumber"
                  label="Mobile Number"
                  // error={!!errors.mobileNumber}
                  // helperText={
                  //   errors.mobileNumber && "Mobile number is Required!"
                  // }
                  type="number"
                  // required
                  size={"small"}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Controller
              control={control}
              name="gstInNumber"
              defaultValue=""
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="gstInNumber"
                  label="GSTIN #"
                  // error={!!errors.gstInNumber}
                  // helperText={errors.gstInNumber && "GST # is required!"}
                  type="text"
                  size={"small"}
                  // required
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Controller
              control={control}
              name="creditDays"
              defaultValue={0}
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="creditDays"
                  label="Credit Days"
                  // error={!!errors.creditDays}
                  // helperText={errors.creditDays && "Credit Days # is required!"}
                  type="number"
                  size={"small"}
                  InputProps={{ inputProps: { min: 0 } }}

                  // required
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormGroup>
              <Stack direction="row" spacing={3}>
                <FormControlLabel
                  control={
                    <Controller
                      name="isShipper"
                      control={control}
                      defaultValue={false}
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          checked={value}
                          onChange={(val) => onChange(val)}
                          // name="taskClose"
                        />
                      )}
                    />
                  }
                  label="Shipper"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="isConsignee"
                      control={control}
                      defaultValue={false}
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          checked={value}
                          onChange={(val) => onChange(val)}
                          // name="taskClose"
                        />
                      )}
                    />
                  }
                  label="Consignee"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="isNotifier"
                      control={control}
                      defaultValue={false}
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          checked={value}
                          onChange={(val) => onChange(val)}
                          // name="taskClose"
                        />
                      )}
                    />
                  }
                  label="Notifier"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="isOverseasAgent"
                      control={control}
                      defaultValue={false}
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          checked={value}
                          onChange={(val) => onChange(val)}
                          // name="taskClose"
                        />
                      )}
                    />
                  }
                  label="Overseas Agent"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="isCHA"
                      control={control}
                      defaultValue={false}
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          checked={value}
                          onChange={(val) => onChange(val)}
                          // name="taskClose"
                        />
                      )}
                    />
                  }
                  label="CHA"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="isLine"
                      control={control}
                      defaultValue={false}
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          checked={value}
                          onChange={(val) => onChange(val)}
                          // name="taskClose"
                        />
                      )}
                    />
                  }
                  label="Line"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="isTransporter"
                      control={control}
                      defaultValue={false}
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          checked={value}
                          onChange={(val) => onChange(val)}
                          // name="taskClose"
                        />
                      )}
                    />
                  }
                  label="Transporter"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="isSupplier"
                      control={control}
                      defaultValue={false}
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          checked={value}
                          onChange={(val) => onChange(val)}
                          // name="taskClose"
                        />
                      )}
                    />
                  }
                  label="Supplier"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="isDeliveryAgent"
                      control={control}
                      defaultValue={false}
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          checked={value}
                          onChange={(val) => onChange(val)}
                          // name="taskClose"
                        />
                      )}
                    />
                  }
                  label="Delivery Agent"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="isWarehouse"
                      control={control}
                      defaultValue={false}
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          checked={value}
                          onChange={(val) => onChange(val)}
                          // name="taskClose"
                        />
                      )}
                    />
                  }
                  label="Warehouse"
                  labelPlacement="start"
                />
              </Stack>
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
    </Container>
  );
};

export default AddCustomerVendor;
