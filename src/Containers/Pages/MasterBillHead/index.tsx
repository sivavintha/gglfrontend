import * as React from "react";
import CustomDataTable from "../../../Components/CustomDataTable";

import { Close, Delete, Edit, Visibility } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../Hooks";

import { billHeadActions } from "../../../Store/Reducers/BillHeadReducer";
import {
  deleteBillHeadById,
  getBillHeads,
} from "../../../Store/Actions/BillHeadActions";
import AddBillHead from "./AddBillHead";
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
import ViewBillHead from "./ViewBillHead";
import { Navigate, useNavigate } from "react-router";

const BillHeadList: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const [editBillHeadId, setEditBillHeadId] = React.useState<any>(null);
  const [viewBillHeadId, setViewBillHeadId] = React.useState<any>(null);

  const [category, setCategory] = React.useState<any>("CUSTOMER");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const BillHeadStatus = useAppSelector((state) => state.billHead.status);
  const BillHeadsData = useAppSelector((state) => state.billHead.billHeads);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  React.useEffect(() => {
    if (BillHeadStatus && BillHeadStatus.type) {
      enqueueSnackbar(BillHeadStatus.message, {
        variant: BillHeadStatus.type,
      });
      dispatch(
        billHeadActions.setStatus({
          statusType: "",
          message: "",
        })
      );
    }
  }, [BillHeadStatus]);

  React.useEffect(() => {
    dispatch(getBillHeads(category));
  }, [dispatch, category]);

  const deleteBillHead = (id: string) => {
    dispatch(deleteBillHeadById(id));
  };

  const editBillHead = (id: string) => {
    setEditBillHeadId(id);
    navigate("/master/addbillhead", { state: { id: id } });
  };

  const viewBillHead = (id: string) => {
    setViewBillHeadId(id);
    setOpenDialog(true);
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

  const BillHeadColumn = [
    {
      field: "code",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "billHeadName",
      headerName: "Name",
      flex: 1,
    },

    { field: "sac", headerName: "SAC", flex: 1 },
    { field: "gstApplicable", headerName: "GST Applicable", flex: 1 },
    {
      field: "gstSlab",
      headerName: "GST Slab",
      flex: 1,
      valueGetter: (params: any) => {
        return params.value ? params.value.gst + " %" : " - ";
      },
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
          onClick={() => viewBillHead(params.id)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => editBillHead(params.id)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteBillHead(params.id)}
        />,
      ],
    },
  ];

  return (
    <>
      <Box sx={{ mt: "20px", p: "20px" }}>
        <CssBaseline />
        <Typography variant="h5" gutterBottom>
          BillHeads
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
            <Tab label=" Add BillHeads" />
          </Tabs>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
        >
          <TabPanel value={value} index={0}>
            <CustomDataTable
              columns={BillHeadColumn}
              rows={BillHeadsData}
              getRowId={(row: any) => row._id}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddBillHead />
          </TabPanel>
        </SwipeableViews>
      </Box>
      {openDialog && (
        <CustomDialog
          maxWidth="md"
          open={openDialog}
          title="BillHeads"
          handleClose={handleCloseDialog}
          Content={<ViewBillHead id={viewBillHeadId} />}
          Actions={<DialogActions />}
        />
      )}
    </>
  );
};

export default BillHeadList;
