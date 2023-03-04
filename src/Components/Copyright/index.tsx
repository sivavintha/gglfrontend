import * as React from "react";

import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" to="/">
       ggl.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
