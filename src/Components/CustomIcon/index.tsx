import * as React from "react";
import { ICustomIcon } from "../../Interfaces";

const CustomIcon: React.FC<ICustomIcon> = ({ src, width }) => {
  return <img src={src} alt="" style={{ width: width }} />;
};

export default CustomIcon;
