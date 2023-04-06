import React from "react";
import { Button, CssBaseline, TextField, Grid, Container } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import {
  addNewGST,
  getGSTById,
  updateGST,
} from "../../../Store/Actions/GSTActions";
import { gstActions } from "../../../Store/Reducers/GSTReducer";

import { Cancel, Save } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";

interface IAddGST {
  id?: string;
}

const AddGST: React.FC<IAddGST> = ({ id }) => {
  const DEFAULT_FORM_VALUES = {
    gst: 0,
    cgst: 0,
    sgst: 0,
    igst: 0,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<any>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const dispatch = useAppDispatch();
  const location = useLocation();
  const newState = location.state as IAddGST;
  const gstId: any = newState?.id;
  const navigate = useNavigate();
  const currentGST = useAppSelector((state) => state.gst.currentGST);
  const currentStatus = useAppSelector((state) => state.gst.status);

  const [effectiveFrom, seteffectiveFrom] = React.useState<any>(moment());

  const [effectiveTo, seteffectiveTo] = React.useState<any>(moment());

  const handleEffectiveFromChange = (newValue: any) => {
    seteffectiveFrom(newValue);
  };

  const handleEffectiveToChange = (newValue: any) => {
    seteffectiveTo(newValue);
  };

  React.useEffect(() => {
    if (currentStatus && currentStatus.type === "success") {
      reset();
      seteffectiveFrom(moment());
      seteffectiveTo(moment());
    }
  }, [currentStatus]);

  React.useEffect(() => {
    if (gstId) {
      dispatch(getGSTById(gstId));
    } else {
      dispatch(gstActions.fetchGSTById({ gst: null }));
    }
  }, [gstId]);

  React.useEffect(() => {
    if (currentGST) {
      setValue("gst", currentGST.gst);
      setValue("cgst", currentGST.cgst);
      setValue("sgst", currentGST.sgst);
      setValue("igst", currentGST.igst);
      seteffectiveFrom(currentGST.effectiveFrom);
      seteffectiveTo(currentGST.effectiveTo);
    } else {
      reset(DEFAULT_FORM_VALUES);
      seteffectiveFrom(moment());
      seteffectiveTo(moment());
    }
  }, [currentGST]);

  //   React.useEffect(() => {
  //     const gstValue = getValues("gst");
  //     console.log('gstValue ===>', gstValue)
  //     if (gstValue) {
  //       calculateGSTSlab(gstValue);
  //     }
  //   }, [getValues("gst")]);

  //   const calculateGSTSlab = (rate: number) => {
  //     setValue("cgst", rate / 2);
  //     setValue("sgst", rate / 2);
  //     setValue("igst", rate);
  //   };

  const submitHandler = (data: any, event: any) => {
    event.preventDefault();
    const gst = { ...data };
    gst.effectiveFrom = effectiveFrom;
    gst.effectiveTo = effectiveTo;
    console.log("submithandler ===>", gst);
    if (gstId) {
      gst._id = gstId;
      dispatch(updateGST(gst));
      navigate("/gst");
    } else {
      dispatch(addNewGST(gst));
    }
  };

  const cancelHandler = () => {
    reset();
    seteffectiveFrom(moment());
    seteffectiveTo(moment());

    if (gstId) {
      navigate("/gst");
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <form
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        style={{ marginTop: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Controller
              control={control}
              name="gst"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="gst"
                  label="GST"
                  error={!!errors.gst}
                  helperText={errors.gst && "GST is Required!"}
                  type="number"
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Controller
              control={control}
              name="sgst"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="sgst"
                  label="SGST"
                  error={!!errors.sgst}
                  helperText={errors.sgst && "SGST is Required!"}
                  type="number"
                  required
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Controller
              control={control}
              name="cgst"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="cgst"
                  label="CGST"
                  error={!!errors.cgst}
                  helperText={errors.cgst && "CGST is Required!"}
                  type="number"
                  required
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Controller
              control={control}
              name="igst"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="igst"
                  label="IGST"
                  error={!!errors.igst}
                  helperText={errors.igst && "IGST is Required!"}
                  type="number"
                  required
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <DesktopDatePicker
              label="Valid From"
              inputFormat="DD/MM/YYYY"
              value={effectiveFrom}
              onChange={handleEffectiveFromChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <DesktopDatePicker
              label="Valid To"
              inputFormat="DD/MM/YYYY"
              value={effectiveTo}
              onChange={handleEffectiveToChange}
              renderInput={(params) => <TextField {...params} />}
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

export default AddGST;
