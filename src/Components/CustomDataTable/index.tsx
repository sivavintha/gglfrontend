import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Styles from "./CustomDataTable.module.css";
import { Box, Paper, Typography, Divider } from "@mui/material";
import { ICustomDataTable } from "../../Interfaces";

const CustomDataTableHeader: React.FC<{ title: string }> = (props: {
  title: string;
}) => {
  return (
    <Box>
      <Typography
        variant="h6"
        display="block"
        sx={{ textTransform: "uppercase", padding: "10px" }}
      >
        {props.title}
      </Typography>
      <Divider />
    </Box>
  );
};

const CustomDataTable: React.FC<ICustomDataTable> = ({
  columns,
  rows,
  checkboxNeeded,
  getRowId,
  title,
  height = "600px",
  footer,
}) => {
  return (
    <Box
      component={Paper}
      sx={{ height: height, backgroundColor: "transparent" }}
      elevation={6}
    >
      <DataGrid
        getRowId={getRowId}
        columns={columns}
        rows={rows}
        checkboxSelection={checkboxNeeded}
        classes={{
          root: Styles.root,
          cell: Styles.cell,
          columnHeader: Styles.columnHeader,
        }}
        disableSelectionOnClick
        components={{
          Footer: footer,
        }}
        componentsProps={{
          header: { title },
        }}
      />
    </Box>
  );
};

export default CustomDataTable;
