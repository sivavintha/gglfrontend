import { Close } from "@mui/icons-material";
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { ICustomListItem } from "../../Interfaces";

import Styles from "./CustomList.module.css";

const CustomListItem: React.FC<ICustomListItem> = ({
  icon,
  primaryText,
  secondaryText,
  handleClick,
}) => {
  return (
    <ListItem
      sx={{ width: "100%", p: "15px" }}
      className={Styles.listItem}
      onClick={handleClick}
    >
      {icon && (
        <ListItemAvatar>
          <div className={Styles.avatar}>{icon}</div>
        </ListItemAvatar>
      )}
      <ListItemText primary={primaryText} secondary={secondaryText} />
      <Close />
    </ListItem>
  );
};

export default CustomListItem;
