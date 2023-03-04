import * as React from "react";
import CustomDataTable from "../../../Components/CustomDataTable";

import { Close, Delete, Edit, Visibility } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../Hooks";

import { commodityActions } from "../../../Store/Reducers/CommodityReducer";
import {
  deleteCommodityById,
  getCommodity,
} from "../../../Store/Actions/CommodityActions";
import AddCommodity from "./AddCommodity";
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
import ViewCommodity from "./ViewCommodity";
import { useNavigate } from "react-router";

const CommodityList: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const [editCommodityId, setEditCommodityId] = React.useState<any>(null);
  const [viewCommodityId, setViewCommodityId] = React.useState<any>(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const CommodityStatus = useAppSelector((state) => state.commodity.status);
  const CommodityData = useAppSelector((state) => state.commodity.commodity);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  React.useEffect(() => {
    if (CommodityStatus && CommodityStatus.type) {
      enqueueSnackbar(CommodityStatus.message, {
        variant: CommodityStatus.type,
      });
      dispatch(
        commodityActions.setStatus({
          statusType: "",
          message: "",
        })
      );
    }
  }, [CommodityStatus]);

  React.useEffect(() => {
    dispatch(getCommodity());
  }, [dispatch]);

  const deleteCommodity = (id: string) => {
    dispatch(deleteCommodityById(id));
  };

  const editCommodity = (id: string) => {
    setEditCommodityId(id);
    navigate("/master/addcommodity", { state: { id: id } });
  };

  const viewCommodity = (id: string) => {
    setViewCommodityId(id);
    setOpenDialog(true);
  };

  const getGSTRate = (params: any) => {
    return params.row.gstSlab?.gst || "";
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

  const CommodityColumn = [
    {
      field: "code",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "commodityName",
      headerName: "Name",
      flex: 1,
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
          onClick={() => viewCommodity(params.id)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => editCommodity(params.id)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteCommodity(params.id)}
        />,
      ],
    },
  ];

  return (
    <>
      <Box sx={{ mt: "20px", p: "20px" }}>
        <CssBaseline />
        <Typography variant="h5" gutterBottom>
          COMMODITY
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
            <Tab label="Add Commodity" />
          </Tabs>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
        >
          <TabPanel value={value} index={0}>
            <CustomDataTable
              columns={CommodityColumn}
              rows={CommodityData}
              getRowId={(row: any) => row._id}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddCommodity />
          </TabPanel>
        </SwipeableViews>
      </Box>
      {openDialog && (
        <CustomDialog
          maxWidth="md"
          open={openDialog}
          title="Commodity"
          handleClose={handleCloseDialog}
          Content={<ViewCommodity id={viewCommodityId} />}
          Actions={<DialogActions />}
        />
      )}
    </>
  );
};

export default CommodityList;
