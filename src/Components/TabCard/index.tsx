import { Paper, Box, Typography } from "@mui/material";
import React from "react";
import Styles from "./TabCard.module.css";
import classNames from "classnames";

interface ITabCard {
  active: boolean;
  icon: any;
  lbl: string;
  description: string;
}

const TabCard: React.FC<ITabCard> = ({ active, icon, lbl, description }) => {
  const classes = classNames(Styles.tabCard, { [Styles.active]: active });

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "10px",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "secondary.light",
      }}
      className={classes}
    >
      <Box>
        <Box>
          <Box>{icon}</Box>
          <Box className={Styles.label}>{lbl}</Box>
        </Box>
      </Box>
      {description && (
        <Box sx={{ pl: "30px" }}>
          <Typography>{description}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TabCard;
