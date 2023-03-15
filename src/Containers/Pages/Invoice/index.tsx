import * as React from "react";
import CustomDataTable from "../../../Components/CustomDataTable";

import { Close, Delete, Edit, Print, Visibility } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { styled } from "@mui/material/styles";

import { invoiceActions } from "../../../Store/Reducers/InvoiceReducer";
import {
  deleteInvoiceById,
  getInvoices,
} from "../../../Store/Actions/InvoiceActions";
import CreateInvoice from "./CreateInvoice";
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
import ViewInvoice from "./ViewInvoice";
import { Navigate, useNavigate } from "react-router";
import PreviewInvoice from "./PreviewInvoice";
import moment from "moment";

const InvoiceList: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const [viewInvoiceId, setViewInvoiceId] = React.useState<any>(null);
  const [printInvoiceId, setPrintInvoiceId] = React.useState<any>(null);
  const [openPrintDialog, setOpenPrintDialog] = React.useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const InvoiceStatus = useAppSelector((state) => state.invoice.status);
  const InvoicesData = useAppSelector((state) => state.invoice.invoices);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  React.useEffect(() => {
    if (InvoiceStatus && InvoiceStatus.type) {
      enqueueSnackbar(InvoiceStatus.message, {
        variant: InvoiceStatus.type,
      });
      dispatch(
        invoiceActions.setStatus({
          statusType: "",
          message: "",
        })
      );
    }
  }, [InvoiceStatus]);

  React.useEffect(() => {
    dispatch(getInvoices(false));
  }, [dispatch]);

  const deleteInvoice = (id: string) => {
    dispatch(deleteInvoiceById(id));
  };

  const editInvoice = (id: string) => {
    navigate("/createInvoice", { state: { id: id } });
  };

  const viewInvoice = (id: string) => {
    setViewInvoiceId(id);
    setOpenDialog(true);
  };

  const printInvoice = (id: string) => {
    setPrintInvoiceId(id);
    setOpenPrintDialog(true);
  };

  const handleClosePrintDialog = () => {
    setOpenPrintDialog(false);
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
  const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
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

  const billingPartyName = (params: any) => {
    return params.row.billingParty ? params.row.billingParty.name : "";
  };

  const bookingNo = (params: any) => {
    return params.row.bookingNo ? params.row.bookingNo.bookingNo : "";
  };

  const invoiceDate = (params: any) => {
    return params.row.invoiceDate ? moment(params.row.invoiceDate).format("DD/MM/YYYY") : "";
  };

  const InvoiceColumn = [
    {
      field: "invoiceNo",
      headerName: "Invoice No",
      flex: 1,
    },
    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      flex: 1,
      valueGetter: invoiceDate
    },
    {
      field: "invoiceCategory",
      headerName: "Invoice Category",
      flex: 1,
    },
    {
      field: "bookingNo",
      headerName: "Booking No",
      flex: 1,
      valueGetter: bookingNo,
    },
    {
      field: "billingTo",
      headerName: "Billing To",
      flex: 1,
    },
    {
      field: "billingParty",
      headerName: "Billing Party",
      flex: 1,
      valueGetter: billingPartyName,
    },
    { field: "isFinalled", headerName: "Finalized", flex: 1 },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      getActions: (params: any) => [
        <GridActionsCellItem
          icon={<Visibility />}
          label="View"
          onClick={() => viewInvoice(params.id)}
        />,
        // <GridActionsCellItem
        //   icon={<Edit />}
        //   label="Edit"
        //   onClick={() => editInvoice(params.id)}
        // />,
        <GridActionsCellItem
          icon={<Print />}
          label="Print"
          onClick={() => printInvoice(params.id)}
        />,
      ],
    },
  ];

  return (
    <>
      <Box sx={{ mt: "20px", p: "20px" }}>
        <CssBaseline />
        <Typography variant="h5" gutterBottom>
          INVOICE
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
            <Tab label=" Create Invoice" />
          </Tabs>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
        >
          <TabPanel value={value} index={0}>
            <CustomDataTable
              columns={InvoiceColumn}
              rows={InvoicesData}
              getRowId={(row: any) => row._id}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CreateInvoice />
          </TabPanel>
        </SwipeableViews>
      </Box>
      {openDialog && (
        <CustomDialog
          maxWidth="md"
          open={openDialog}
          title="Invoice"
          handleClose={handleCloseDialog}
          Content={<ViewInvoice id={viewInvoiceId} />}
          Actions={<DialogActions />}
        />
      )}
      {openPrintDialog && (
        <CustomDialog
          maxWidth="xl"
          open={openPrintDialog}
          title="Invoice"
          handleClose={handleClosePrintDialog}
          Content={<PreviewInvoice id={printInvoiceId} />}
          Actions={<DialogPrintActions />}
        />
      )}
    </>
  );
};

export default InvoiceList;
