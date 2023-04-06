import React from "react";
import { Button, CssBaseline, TextField, Grid, Container } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import {
  addNewSeaPorts,
  getSeaPortsById,
  updateSeaPorts,
} from "../../../Store/Actions/SeaPortsActions";
import { seaPortsActions } from "../../../Store/Reducers/SeaPortsReducer";

import { Cancel, Save } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { getGST } from "../../../Store/Actions/GSTActions";

interface IAddSeaPorts {
  id?: string;
}

const AddSeaPorts: React.FC<IAddSeaPorts> = ({ id }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const newState = location.state as IAddSeaPorts;
  const seaPortsId: any = newState?.id;
  const navigate = useNavigate();
  const currentSeaPorts = useAppSelector(
    (state) => state.seaPorts.currentSeaPort
  );
  const currentStatus = useAppSelector((state) => state.seaPorts.status);

  const DEFAULT_FORM_VALUES = {
    portCode: "",
    portName: "",
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
    if (seaPortsId) {
      dispatch(getSeaPortsById(seaPortsId));
    } else {
      dispatch(seaPortsActions.fetchSeaPortsById({ seaPorts: null }));
    }
  }, [seaPortsId]);

  React.useEffect(() => {
    if (currentSeaPorts) {
      setValue("portName", currentSeaPorts.portName);
      setValue("portCode", currentSeaPorts.portCode);
    } else {
      reset(DEFAULT_FORM_VALUES);
    }
  }, [currentSeaPorts]);

  const submitHandler = (data: any, event: any) => {
    event.preventDefault();
    const seaPorts = { ...data };
    seaPorts.portCode = data.portCode.toUpperCase();
    if (seaPortsId) {
      seaPorts._id = seaPortsId;
      dispatch(updateSeaPorts(seaPorts));
      navigate("/master/seaports");
    } else {
      dispatch(addNewSeaPorts(seaPorts));
    }
  };

  const cancelHandler = () => {
    reset();

    if (seaPortsId) {
      navigate("/master/seaports");
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
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="portCode"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="portCode"
                  label="Port Code"
                  error={!!errors.name}
                  helperText={errors.name && "Port Code is Required!"}
                  type="text"
                  size={"small"}
                  required
                  inputProps={{
                    maxLength: 5,
                    style: { textTransform: "uppercase" },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="portName"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="portName"
                  label="Port Name"
                  error={!!errors.portName}
                  helperText={errors.portName && "Port Name is Required!"}
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

export default AddSeaPorts;
