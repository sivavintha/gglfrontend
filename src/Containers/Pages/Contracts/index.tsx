import * as React from "react";
import CustomDataTable from "../../../Components/CustomDataTable";

import { Close, Delete, Edit, Print, Visibility } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../Hooks";

import { contractActions } from "../../../Store/Reducers/ContractReducer";
import {
  deleteContractById,
  getContracts,
} from "../../../Store/Actions/ContractActions";
import AddContract from "./AddContract";
import {
  Box,
  CssBaseline,
  Tabs,
  Tab,
  useTheme,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useSnackbar } from "notistack";
import TabPanel from "../../../Components/TabPanel";
import SwipeableViews from "react-swipeable-views";
import CustomDialog from "../../../Components/CustomDialog";
import ViewContract from "./ViewContract";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import PreviewContract from "./PreviewContract";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ContractList: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openPrintDialog, setOpenPrintDialog] = React.useState(false);

  const [editContractId, setEditContractId] = React.useState<any>(null);
  const [viewContractId, setViewContractId] = React.useState<any>(null);
  const [printContractId, setPrintContractId] = React.useState<any>(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const ContractStatus = useAppSelector((state) => state.contract.status);
  const ContractsData = useAppSelector((state) => state.contract.contracts);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClosePrintDialog = () => {
    setOpenPrintDialog(false);
  };

  React.useEffect(() => {
    dispatch(getContracts());
  }, [dispatch]);

  React.useEffect(() => {
    if (ContractStatus && ContractStatus.type) {
      enqueueSnackbar(ContractStatus.message, {
        variant: ContractStatus.type,
      });
      dispatch(
        contractActions.setStatus({
          statusType: "",
          message: "",
        })
      );
    }
  }, [ContractStatus]);

  const deleteContract = (id: string) => {
    dispatch(deleteContractById(id));
  };

  const editContract = (id: string) => {
    setEditContractId(id);
    navigate("/contract/addcontract", { state: { id: id } });
  };

  const viewContract = (id: string) => {
    setViewContractId(id);
    setOpenDialog(true);
  };

  const printContract = (id: string) => {
    setPrintContractId(id);
    setOpenPrintDialog(true);
  };

  const DialogActions = () => {
    return (
      <Stack
        direction="row"
        spacing="1"
        sx={{ textAlign: "right", display: "flex", alignItems: "center" }}
      >
        <Item>
          <Button onClick={handleCloseDialog} variant="contained" color="error">
            <Close /> Close
          </Button>
        </Item>
      </Stack>
    );
  };

  const DialogPrintActions = () => {
    return (
      <Stack
        direction="row"
        spacing="1"
        sx={{ textAlign: "right", display: "flex", alignItems: "center" }}
      >
        <Item>
          <Button
            onClick={handleClosePrintDialog}
            variant="contained"
            color="error"
          >
            <Close /> Close
          </Button>
        </Item>
      </Stack>
    );
  };

  const getCommodityName = (params: any) => {
    return params.row.commodity.commodityName;
  };

  const getBuyerName = (params: any) => {
    return params.row.buyer.name;
  };

  const getSellerName = (params: any) => {
    return params.row.seller.name;
  };

  const getOriginName = (params: any) => {
    return params.row.origin?.originName || "";
  };

  const ContractColumn = [
    {
      field: "code",
      headerName: "Code",
      flex: 1,
    },

    {
      field: "buyer",
      headerName: "Buyer",
      flex: 1,
      valueGetter: getBuyerName,
    },
    {
      field: "seller",
      headerName: "Seller",
      flex: 1,
      valueGetter: getSellerName,
    },
    {
      field: "origin",
      headerName: "Origin",
      flex: 1,
      valueGetter: getOriginName,
    },
    {
      field: "commodity",
      headerName: "Commodity",
      flex: 1,
      valueGetter: getCommodityName,
    },
    {
      field: "rate",
      headerName: "Price",
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
          onClick={() => viewContract(params.id)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => editContract(params.id)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteContract(params.id)}
        />,
        <GridActionsCellItem
          icon={<Print />}
          label="Print"
          onClick={() => printContract(params.id)}
        />,
      ],
    },
  ];

  return (
    <>
      <Box sx={{ mt: "20px", p: "20px" }}>
        <CssBaseline />
        <Typography variant="h5" gutterBottom>
          CONTRACTS
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
            <Tab label=" Add Contracts" />
          </Tabs>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
        >
          <TabPanel value={value} index={0}>
            <CustomDataTable
              columns={ContractColumn}
              rows={ContractsData}
              getRowId={(row: any) => row._id}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddContract />
          </TabPanel>
        </SwipeableViews>
      </Box>
      {openDialog && (
        <CustomDialog
          maxWidth="md"
          open={openDialog}
          title="Contract"
          handleClose={handleCloseDialog}
          Content={<ViewContract id={viewContractId} />}
          Actions={<DialogActions />}
        />
      )}

      {openPrintDialog && (
        <CustomDialog
          maxWidth="xl"
          open={openPrintDialog}
          title="Contract"
          handleClose={handleClosePrintDialog}
          Content={<PreviewContract id={printContractId} />}
          Actions={<DialogPrintActions />}
        />
      )}
    </>
  );
};

export default ContractList;
