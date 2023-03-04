import React, { useEffect } from "react";
import { FormLabel, Grid, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { getSeaPortsById } from "../../../Store/Actions/SeaPortsActions";

interface IViewSeaPorts {
  id: string;
}

const ViewSeaPorts: React.FC<IViewSeaPorts> = ({ id }) => {
  const dispatch = useAppDispatch();

  const currentSeaPorts = useAppSelector(
    (state) => state.seaPorts.currentSeaPort
  );

  useEffect(() => {
    dispatch(getSeaPortsById(id));
  }, [id]);

  return (
    <Grid container sx={{ mt: "10px" }} spacing={2}>
      <Grid item xs={12} sm={4}>
        <FormLabel>Code: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          {currentSeaPorts && currentSeaPorts?.portCode}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>Name: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          {currentSeaPorts && currentSeaPorts?.portName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ViewSeaPorts;
