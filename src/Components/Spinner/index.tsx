import * as React from "react";
import { Box } from "@mui/material";
import { ScaleLoader } from "react-spinners";
import { useAppSelector } from "../../Hooks";

const Spinner: React.FC = () => {
  const loading = useAppSelector((state) => state.spinner.loading);
  const color = useAppSelector((state) => state.spinner.color);
  return (
    <Box>
      <ScaleLoader color={color} loading={loading} />
    </Box>
  );
};

export default Spinner;
