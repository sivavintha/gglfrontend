import React, { useEffect } from "react";
import { Avatar, FormLabel, Grid, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { getCommodityById } from "../../../Store/Actions/CommodityActions";

interface IViewCommodity {
  id: string;
}

const ViewCommodity: React.FC<IViewCommodity> = ({ id }) => {
  const dispatch = useAppDispatch();

  const currentCommodity = useAppSelector(
    (state) => state.commodity.currentCommodity
  );

  useEffect(() => {
    dispatch(getCommodityById(id));
  }, [id]);

  return (
    <Grid container sx={{ mt: "10px" }} spacing={2}>
      <Grid item xs={12} sm={4}>
        <FormLabel>Code: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          {currentCommodity && currentCommodity?.code}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>Name: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          {currentCommodity && currentCommodity?.commodityName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ViewCommodity;
