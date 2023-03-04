import React, { useState } from "react";
import { Button, CssBaseline, TextField, Grid, Container } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import {
  addNewCommodity,
  getCommodityById,
  updateCommodity,
} from "../../../Store/Actions/CommodityActions";
import { commodityActions } from "../../../Store/Reducers/CommodityReducer";

import { Cancel, Save } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { getGST } from "../../../Store/Actions/GSTActions";

interface IAddCommodity {
  id?: string;
}

const AddCommodity: React.FC<IAddCommodity> = ({ id }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const newState = location.state as IAddCommodity;
  const commodityId: any = newState?.id;
  const navigate = useNavigate();
  const currentCommodity = useAppSelector(
    (state) => state.commodity.currentCommodity
  );
  const currentStatus = useAppSelector((state) => state.commodity.status);

  const DEFAULT_FORM_VALUES = {
    commodityName: "",
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

  React.useEffect(() => {
    if (currentStatus && currentStatus.type === "success") {
      reset();
    }
  }, [currentStatus]);

  React.useEffect(() => {
    dispatch(getGST());
  }, [dispatch]);

  React.useEffect(() => {
    if (commodityId) {
      dispatch(getCommodityById(commodityId));
    } else {
      dispatch(commodityActions.fetchCommodityById({ commodity: null }));
    }
  }, [commodityId]);

  React.useEffect(() => {
    if (currentCommodity) {
      setValue("commodityName", currentCommodity.commodityName);
    } else {
      reset(DEFAULT_FORM_VALUES);
    }
  }, [currentCommodity]);

  const submitHandler = (data: any, event: any) => {
    event.preventDefault();
    const commodity = { ...data };

    if (commodityId) {
      commodity._id = commodityId;
      dispatch(updateCommodity(commodity));
      navigate("/master/commodity");
    } else {
      dispatch(addNewCommodity(commodity));
    }
  };

  const cancelHandler = () => {
    reset();

    if (commodityId) {
      navigate("/master/commodity");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <form
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        style={{ marginTop: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="commodityName"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="commodityName"
                  label="Name"
                  error={!!errors.name}
                  helperText={errors.name && "Name is Required!"}
                  type="text"
                  size={"small"}
                  required
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

export default AddCommodity;
