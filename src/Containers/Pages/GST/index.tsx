import * as React from "react";
import CustomDataTable from "../../../Components/CustomDataTable";

import { Close, Delete, Edit, Visibility } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../Hooks";

import { gstActions } from "../../../Store/Reducers/GSTReducer";
import { deleteGSTById, getGST } from "../../../Store/Actions/GSTActions";
import AddGST from "./AddGST";
import {
  Box,
  CssBaseline,
  Tabs,
  Tab,
  useTheme,
  Typography,
  Button,
} from "@mui/material";
import { useSnackbar } from "notistack";
import TabPanel from "../../../Components/TabPanel";
import SwipeableViews from "react-swipeable-views";
import CustomDialog from "../../../Components/CustomDialog";
import ViewGST from "./ViewGST";
import { useNavigate } from "react-router";
import moment from "moment";

const GSTList: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const [editGSTId, setEditGSTId] = React.useState<any>(null);
  const [viewGSTId, setViewGSTId] = React.useState<any>(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const GSTStatus = useAppSelector((state) => state.gst.status);
  const GSTData = useAppSelector((state) => state.gst.gst);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  React.useEffect(() => {
    if (GSTStatus && GSTStatus.type) {
      enqueueSnackbar(GSTStatus.message, {
        variant: GSTStatus.type,
      });
      dispatch(
        gstActions.setStatus({
          statusType: "",
          message: "",
        })
      );
    }
  }, [GSTStatus]);

  React.useEffect(() => {
    dispatch(getGST());
  }, [dispatch]);

  const deleteGST = (id: string) => {
    dispatch(deleteGSTById(id));
  };

  const editGST = (id: string) => {
    setEditGSTId(id);
    navigate("/gst/addgst", { state: { id: id } });
  };

  const viewGST = (id: string) => {
    setViewGSTId(id);
    setOpenDialog(true);
  };

  const formatDate = (date: any) => {
    return moment(date).format("DD-MM-YYYY");
  };

  const getEffectivFrom = (params: any) => {
    return formatDate(params.row.effectiveFrom);
  };

  const getEffectivTo = (params: any) => {
    return params.row.effectiveTo ? formatDate(params.row.effectiveTo) : "";
  };

  const DialogActions = () => {
    return (
      <>
        <Button onClick={handleCloseDialog} variant="contained">
          <Close /> Close
        </Button>
      </>
    );
  };

  const GSTColumn = [
    {
      field: "gst",
      headerName: "GST",
      flex: 1,
    },
    {
      field: "cgst",
      headerName: "CGST",
      flex: 1,
    },
    {
      field: "sgst",
      headerName: "SGST",
      flex: 1,
    },
    {
      field: "igst",
      headerName: "IGST",
      flex: 1,
    },
    {
      field: "effectiveFrom",
      headerName: "VALID FROM",
      flex: 1,
      valueGetter: getEffectivFrom,
    },
    {
      field: "effectiveTo",
      headerName: "VALID TILL",
      flex: 1,
      valueGetter: getEffectivTo,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      getActions: (params: any) => [
        <GridActionsCellItem
          icon={<Visibility />}
          label="View"
          onClick={() => viewGST(params.id)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => editGST(params.id)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteGST(params.id)}
        />,
      ],
    },
  ];

  return (
    <>
      <Box sx={{ mt: "20px", p: "20px" }}>
        <CssBaseline />
        <Typography variant="h5" gutterBottom>
          GST
        </Typography>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              color: "rgba(0, 140, 255, 0.966)",
            }}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Current List" />
            <Tab label="Add GST" />
          </Tabs>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
        >
          <TabPanel value={value} index={0}>
            <CustomDataTable
              columns={GSTColumn}
              rows={GSTData}
              getRowId={(row: any) => row._id}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddGST />
          </TabPanel>
        </SwipeableViews>
      </Box>
      {openDialog && (
        <CustomDialog
          maxWidth="md"
          open={openDialog}
          title="GST"
          handleClose={handleCloseDialog}
          Content={<ViewGST id={viewGSTId} />}
          Actions={<DialogActions />}
        />
      )}
    </>
  );
};

export default GSTList;
