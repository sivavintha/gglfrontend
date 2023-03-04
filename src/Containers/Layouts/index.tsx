import React from "react";

/** * Import Layouts ** */
import HeaderArea from "./Header";

import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";

const Layout: React.FC<{
  children: any;
}> = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <HeaderArea drawerOpen={handleDrawerOpen} open={open} />

      <Box component="div" sx={{ flexGrow: 1, mt: "80px", padding: "20px" }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
