import * as React from "react";
import { Box } from "@mui/material";

interface iTabPanel {
  children: React.ReactNode;
  value: string | number;
  index: string | number;
  removePadding?: boolean;
  dir?: any;
}

const TabPanel: React.FC<iTabPanel> = ({
  children,
  value,
  index,
  removePadding,
}) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && (
        <Box sx={!removePadding ? { p: 3 } : { p: 0 }}>{children}</Box>
      )}
    </Box>
  );
};

export default TabPanel;
