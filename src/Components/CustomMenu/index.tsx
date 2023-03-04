import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router";

const CustomMenu: React.FC<{ item: any }> = ({ item }) => {
  const navigate = useNavigate();

  const hasChildren = (item: any) => {
    const { items: children } = item;

    if (children === undefined) {
      return false;
    }

    if (children.constructor !== Array) {
      return false;
    }

    if (children.length === 0) {
      return false;
    }

    return true;
  };

  const handleSideMenuClick = (navigateTo: string) => {
    navigate(navigateTo);
  };

  const SingleLevel: React.FC<any> = ({ item }) => {
    return (
      <ListItem button onClick={() => handleSideMenuClick(item.to)}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItem>
    );
  };

  const MultiLevel: React.FC<any> = ({ item }) => {
    const { items: children } = item;
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen((prev) => !prev);
    };

    return (
      <React.Fragment>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ paddingLeft: "20px" }}>
            {children.map((child: any, key: any) => (
              <CustomMenu key={key} item={child} />
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };

  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

export default CustomMenu;
