import React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
  Autocomplete,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import {
  addNewBillHead,
  getBillHeadById,
  updateBillHead,
} from "../../../Store/Actions/BillHeadActions";
import { billHeadActions } from "../../../Store/Reducers/BillHeadReducer";

import { Cancel, Save } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { getGST } from "../../../Store/Actions/GSTActions";

interface IAddBillHead {
  id?: string;
}

const AddBillHead: React.FC<IAddBillHead> = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const DEFAULT_FORM_VALUES = {
    billHeadName: "",
    sac: "",
    gstApplicable: true,
    gstSlab: "",
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

  const dispatch = useAppDispatch();
  const location = useLocation();
  const newState = location.state as IAddBillHead;
  const billHeadId: any = newState?.id;
  const navigate = useNavigate();
  const currentBillHead = useAppSelector(
    (state) => state.billHead.currentBillHead
  );
  const currentStatus = useAppSelector((state) => state.billHead.status);
  const gstSlabData = useAppSelector((state) => state.gst.gst);

  const [disableGSTSlab, setDisableGSTSlab] = React.useState(false);
  const onError = (errors: any, e: any) => console.log(errors, e);

  React.useEffect(() => {
    if (currentStatus && currentStatus.type === "success") {
      reset();
    }
  }, [currentStatus]);

  React.useEffect(() => {
    dispatch(getGST(false));
  }, []);

  React.useEffect(() => {
    if (billHeadId) {
      dispatch(getBillHeadById(billHeadId));
    } else {
      dispatch(billHeadActions.fetchBillHeadById({ billHead: null }));
    }
  }, [billHeadId]);

  React.useEffect(() => {
    if (currentBillHead) {
      setValue("billHeadName", currentBillHead.billHeadName);
      setValue("sac", currentBillHead.sac);
      setValue("gstApplicable", currentBillHead.gstApplicable);
      setValue("gstSlab", currentBillHead.gstSlab);
      setDisableGSTSlab(!currentBillHead.gstSlab);
    } else {
      reset(DEFAULT_FORM_VALUES);
    }
  }, [currentBillHead]);

  const submitHandler = (data: any, event: any) => {
    event.preventDefault();
    if (data.gstApplicable && !data.gstSlab) {
      enqueueSnackbar("Please select valid GST Slab", {
        variant: "error",
      });
      return;
    }
    const billHead = { ...data };
    billHead.gstSlab = billHead.gstApplicable ? billHead.gstSlab._id : "";
    if (billHeadId) {
      billHead._id = billHeadId;
      dispatch(updateBillHead(billHead));
      navigate("/master/billhead");
    } else {
      dispatch(addNewBillHead(billHead));
    }
  };

  const cancelHandler = () => {
    reset();
    setDisableGSTSlab(false);

    if (billHeadId) {
      navigate("/master/billhead");
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <form
        noValidate
        onSubmit={handleSubmit(submitHandler, onError)}
        style={{ marginTop: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Controller
              control={control}
              name="billHeadName"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="billHeadName"
                  label="Name"
                  error={!!errors.billHeadName}
                  helperText={errors.billHeadName && "Name is Required!"}
                  type="text"
                  required
                  size={"small"}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Controller
              control={control}
              name="sac"
              defaultValue=""
              //   rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="sac"
                  label="SAC"
                  // error={!!errors.sac}
                  // helperText={errors.sac && "SAC is Required!"}
                  type="text"
                  // required
                  size={"small"}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Controller
                    name="gstApplicable"
                    control={control}
                    defaultValue={false}
                    render={({ field: { value, onChange } }) => (
                      <Switch
                        checked={value}
                        onChange={(val) => {
                          onChange(val);
                          setDisableGSTSlab(false);
                          if (!val.target.checked) {
                            setValue("gstSlab", null);
                            setDisableGSTSlab(true);
                          }
                        }}
                      />
                    )}
                  />
                }
                label="GST Applicable"
                labelPlacement="start"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} md={3}>
            <Controller
              control={control}
              name="gstSlab"
              //   rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  id="gstSlab"
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  value={value}
                  options={gstSlabData}
                  getOptionLabel={(option) =>
                    option.gst ? option.gst.toString() : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.gst === value.gst
                  }
                  disabled={disableGSTSlab}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="GST Slab"
                      size={"small"}
                      disabled={disableGSTSlab}
                      //   error={!!errors.gstSlab}
                      //   helperText={errors.gstSlab && "GST Slab is required"}
                    />
                  )}
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

export default AddBillHead;
