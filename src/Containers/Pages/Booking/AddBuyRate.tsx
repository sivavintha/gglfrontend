import * as React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
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

import {
  Cancel,
  Save,
  Add,
  Remove,
  Calculate,
  Sell,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { getCustomerVendors, getVendors, } from "../../../Store/Actions/CustomerVendorActions";
import { getBillHeads } from "../../../Store/Actions/BillHeadActions";

type FormValues = {
  bookingNo: any;

  buyRate: {
    narration: any;
    description: string;
    billingTo: any;
    isSupplementary?: boolean;
    basis: any;
    currency: any;
    qty: number;
    unitRate: number;
    exrate: number;
    amount: number;
  }[];
};

interface IBuyRate {
  id?: string;
}

const AddBuyRate = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const newState = location.state as IBuyRate;
  const bookingId: any = newState?.id;
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const bookingData = useAppSelector((state) => state.booking.bookings);
  const customerData = useAppSelector(
    (state) => state.customerVendor.vendors
  );
  const billHeadData = useAppSelector((state) => state.billHead.billHeads);
  const currentBooking = useAppSelector(
    (state) => state.booking.currentBooking
  );

  const currentStatus = useAppSelector((state) => state.booking.status);

  const basisType = [
    {
      name: "Document",
      abbr: "DOC",
    },
    {
      name: "Per 20",
      abbr: "P20",
    },
    {
      name: "Per 40",
      abbr: "P40",
    },
    {
      name: "CBM",
      abbr: "cbm",
    },
  ];

  const currencyType = [
    {
      name: "INR",
      abbr: "INR",
    },
    {
      name: "USD",
      abbr: "USD",
    },
    {
      name: "GBP",
      abbr: "GBP",
    },
    {
      name: "EUR",
      abbr: "EUR",
    },
    {
      name: "AUD",
      abbr: "AUD",
    },
    {
      name: "YEN",
      abbr: "YEN",
    },
    {
      name: "CAD",
      abbr: "CAD",
    },
    {
      name: "ZAR",
      abbr: "ZAR",
    },
  ];

  const DEFAULT_FORM_VALUES = {
    bookingNo: null,
    buyRate: [
      {
        narration: "",
        description: "",
        billingTo: "",
        isSupplementary: false,
        basis: { name: "Document", abbr: "DOC" },
        qty: 0,
        currency: { name: "INR", abbr: "INR" },
        unitRate: 0,
        exrate: 0,
        amount: 0,
      },
    ],
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<FormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const { fields, append, remove } = useFieldArray<FormValues>({
    control,
    name: "buyRate",
  });

  const [currentBookingReceived, setCurrentBookingReceived] =
    React.useState<any>();

  React.useEffect(() => {
    dispatch(getBookings(true));
    dispatch(getVendors("VENDOR", true));
    dispatch(getBillHeads(true));
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
    if (currentBooking) {
      console.log("currentBooking ===>", currentBooking);
      setCurrentBookingReceived(currentBooking);
    }
  }, [currentBooking]);

  React.useEffect(() => {
    if (currentBookingReceived) {
      console.log("basisType ===>", basisType);
      setValue("bookingNo", currentBookingReceived);
      currentBookingReceived.buyRate.map((sell: any) => {
        const record = { ...sell };
        console.log(
          "basis ===>",
          basisType.filter((basis) => basis.name === sell.basis)[0]
        );
        console.log(
          "currency ===>",
          currencyType.filter((currency) => currency.name === sell.currency)[0]
        );

        record.basis = basisType.filter(
          (basis) => basis.name === sell.basis
        )[0];
        record.currency = currencyType.filter(
          (currency) => currency.name === sell.currency
        )[0];
        return record;
      });
      setValue("buyRate", currentBookingReceived.buyRate);
    }
  }, [currentBookingReceived]);

  const onSubmit = (data: FormValues, event: any) => {
    event.preventDefault();

    if (!data.buyRate || data.buyRate.length === 0) {
      enqueueSnackbar("Please add atleast one rate details to save", {
        variant: "error",
      });
      return;
    }
    console.log("data ===>", data);
    data.buyRate.map((sell) => {
      sell.billingTo = customerData.filter((customer) => {
        const value = sell.billingTo._id ? sell.billingTo.name : sell.billingTo;
        return customer.name === value;
      })[0]._id;
      sell.narration = billHeadData.filter((billhead) => {
        const value = sell.narration._id
          ? sell.narration.billHeadName
          : sell.narration;

        return billhead.billHeadName === value;
      })[0]._id;
      return sell;
    });
    const booking: any = {
      _id: data.bookingNo._id,
      buyRate: data.buyRate,
    };
    console.log("booking ===>", booking);

    if (bookingId) {
      booking._id = bookingId;
      dispatch(updateBooking(booking, "RATES"));
      navigate("/booking");
    } else {
      dispatch(updateBooking(booking, "RATES"));
    }
  };

  const cancelHandler = () => {
    reset();

    if (bookingId) {
      navigate("/booking");
    }
  };

  const onError = (errors: any, e: any) => console.log(errors, e);

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
            <Tooltip title="Add More Rates">
              <Fab
                color="success"
                size="small"
                onClick={() => {
                  append({
                    narration: "",
                    description: "",
                    billingTo: "",
                    isSupplementary: false,
                    basis: "",
                    qty: 0,
                    currency: "",
                    unitRate: 0,
                    exrate: 0,
                    amount: 0,
                  });
                }}
              >
                <Add />
              </Fab>
            </Tooltip>
          </Grid>

          <Grid item xs={12}>
            {fields.map((item, index) => (
              <Grid container spacing={1} key={item.id}>
                <Grid item xs={12} md={2}>
                  <Autocomplete
                    id="narration"
                    {...register(`buyRate.${index}.narration`, {
                      required: true,
                    })}
                    options={billHeadData}
                    getOptionLabel={(option) => {
                      return option.billHeadName ? option.billHeadName : "";
                    }}
                    isOptionEqualToValue={(option, value) => {
                      return option.billHeadName === value.billHeadName;
                    }}
                    defaultValue={getValues(`buyRate.${index}.narration`)}
                    onChange={(event, value) =>
                      setValue(`buyRate.${index}.narration`, value)
                    }
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        label="Narration"
                        error={!!errors.buyRate?.[index]?.narration}
                        helperText={
                          errors.buyRate?.[index]?.narration?.message &&
                          "Narration is required"
                        }
                        size="small"
                        name={`buyRate.${index}.narration`}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={1.25}>
                  <TextField
                    label="Description"
                    {...register(`buyRate.${index}.description`)}
                    // error={!!errors.buyRate?.[index]?.description}
                    // helperText={errors.buyRate?.[index]?.description?.message}
                    size={"small"}
                  />
                </Grid>
                <Grid item xs={12} md={1.75}>
                  <Autocomplete
                    id="billingTo"
                    {...register(`buyRate.${index}.billingTo`, {
                      required: true,
                    })}
                    options={customerData}
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name
                    }
                    defaultValue={getValues(`buyRate.${index}.billingTo`)}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        label="Billing To"
                        error={!!errors.buyRate?.[index]?.billingTo}
                        helperText={
                          errors.buyRate?.[index]?.billingTo?.message &&
                          "Billing To is required"
                        }
                        size="small"
                        name={`buyRate.${index}.billingTo`}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={1.25}>
                  <Autocomplete
                    id="basis"
                    {...register(`buyRate.${index}.basis`, {
                      required: true,
                    })}
                    options={basisType}
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name
                    }
                    defaultValue={getValues(`buyRate.${index}.basis`)}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        label="Basis"
                        error={!!errors.buyRate?.[index]?.basis}
                        helperText={
                          errors.buyRate?.[index]?.basis?.message &&
                          "Basis is required"
                        }
                        size="small"
                        name={`buyRate.${index}.basis`}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={0.75}>
                  <Controller
                    name={`buyRate.${index}.qty`}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={getValues(`buyRate.${index}.qty`)}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Qty"
                        type="number"
                        size={"small"}
                        InputLabelProps={{ shrink: true }}
                        onChange={(event) => {
                          setValue(
                            `buyRate.${index}.qty`,
                            parseInt(event.target.value)
                          );
                          const qty = parseInt(event.target.value);
                          const exrate = getValues(`buyRate.${index}.exrate`);

                          const unitprice = getValues(
                            `buyRate.${index}.unitRate`
                          );

                          console.log(
                            "qty , exrae, unitprice, amount ===>",
                            qty,
                            exrate,
                            unitprice,
                            qty * exrate * unitprice
                          );

                          const amount = qty * exrate * unitprice;
                          setValue(`buyRate.${index}.amount`, amount);
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={0.75}>
                  <Autocomplete
                    id="currency"
                    {...register(`buyRate.${index}.currency`, {
                      required: true,
                    })}
                    options={currencyType}
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name
                    }
                    defaultValue={getValues(`buyRate.${index}.currency`)}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        label="CUR"
                        error={!!errors.buyRate?.[index]?.currency}
                        helperText={
                          errors.buyRate?.[index]?.currency?.message &&
                          "Currency is required"
                        }
                        size="small"
                        name={`buyRate.${index}.currency`}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={1.25}>
                  <Controller
                    name={`buyRate.${index}.unitRate`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Unit Price"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        size={"small"}
                        onChange={(event) => {
                          setValue(
                            `buyRate.${index}.unitRate`,
                            parseFloat(event.target.value)
                          );
                          const exrate = getValues(`buyRate.${index}.exrate`);
                          const qty = getValues(`buyRate.${index}.qty`);

                          const unitprice = parseFloat(event.target.value);
                          console.log(
                            "qty , exrae, unitprice, amount ===>",
                            qty,
                            exrate,
                            unitprice,
                            qty * exrate * unitprice
                          );
                          const amount = qty * exrate * unitprice;
                          setValue(`buyRate.${index}.amount`, amount);
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Controller
                    name={`buyRate.${index}.exrate`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Exchange Rate"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        size={"small"}
                        onChange={(event) => {
                          setValue(
                            `buyRate.${index}.exrate`,
                            parseFloat(event.target.value)
                          );
                          const qty = getValues(`buyRate.${index}.qty`);
                          const exrate = parseFloat(event.target.value);

                          const unitprice = getValues(
                            `buyRate.${index}.unitRate`
                          );

                          console.log(
                            "qty , exrae, unitprice, amount ===>",
                            qty,
                            exrate,
                            unitprice,
                            qty * exrate * unitprice
                          );

                          const amount = qty * exrate * unitprice;
                          setValue(`buyRate.${index}.amount`, amount);
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={1.25}>
                  <Controller
                    name={`buyRate.${index}.amount`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Total"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        size={"small"}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={0.5}>
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

export default AddBuyRate;
