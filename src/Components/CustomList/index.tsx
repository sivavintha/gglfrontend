import * as React from "react";
import { List } from "@mui/material";
import CustomListItem from "./CustomListItem";
import { ICustomList } from "../../Interfaces";

const CustomList: React.FC<ICustomList> = ({ items, handleClick }) => {
  return (
    <List sx={{ width: "100%" }}>
      {items.map((item) => (
        <CustomListItem
          key={item.id}
          icon={item.icon}
          primaryText={item.message}
          secondaryText={item.secondaryText}
          handleClick={() => handleClick(item)}
        />
      ))}
    </List>
  );
};

export default CustomList;
