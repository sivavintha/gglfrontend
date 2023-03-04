import * as React from "react";
import CustomAppBar from "../../../Components/CustomAppBar/index";

interface IHeaderArea {
  drawerOpen: () => void;
  open: boolean;
}

const HeaderArea: React.FC<IHeaderArea> = ({ drawerOpen, open }) => {
  return <CustomAppBar drawerOpen={drawerOpen} open={open} />;
};

export default HeaderArea;
