import * as React from "react";
import { Breadcrumbs, Link } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { ICustomBreadCrumb } from "../../Interfaces";

const CustomBreadCrumb: React.FC<ICustomBreadCrumb> = ({
  navigateTo,
  firstLink,
  secondLink,
}) => {
  return (
    <Breadcrumbs
      sx={{ fontSize: "18px" }}
      separator={<NavigateNext fontSize="small" />}
    >
      <Link underline="hover" color="inherit" href={navigateTo}>
        {firstLink}
      </Link>
      <Link
        underline="hover"
        color="text.secondary"
        href="#"
        aria-current="page"
      >
        {secondLink}
      </Link>
    </Breadcrumbs>
  );
};

export default CustomBreadCrumb;
