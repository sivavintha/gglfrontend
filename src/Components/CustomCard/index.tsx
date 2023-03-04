import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { ICustomCard } from "../../Interfaces";

const CustomCard: React.FC<ICustomCard> = ({
  cardContent,
  cardActions,
  containerWidth,
}) => {
  return (
    <Card sx={{ width: containerWidth ? containerWidth : 275 }}>
      <CardContent>{cardContent}</CardContent>
      <CardActions>{cardActions}</CardActions>
    </Card>
  );
};

export default CustomCard;
