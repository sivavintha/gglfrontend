/** * Import libraries ** */
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import { Offline } from "react-detect-offline";
// /** * Import Layouts ** */
import Layout from "../Layouts/index";

/** * Import Error Pages ** */
import BrowserPage from "../Pages/ErrorPages/browser";
import UnauthorizedPage from "../Pages/ErrorPages/unauthorized";
import UrlNotFoundPage from "../Pages/ErrorPages/url-not-found";
import InternalServerPage from "../Pages/ErrorPages/internal-server-error";
// import OfflinePage from "../Pages/ErrorPages/offline";

// /** * Import Pages ** */
//LazyLoading
const Login = React.lazy(() => import("../Pages/Login"));
const DashboardPage = React.lazy(() => import("../Pages/Dashboard"));

const AddCustomerVendor = React.lazy(
  () => import("../Pages/MasterCustomerVendor/AddCustomerVendor")
);
const CustomerVendorList = React.lazy(
  () => import("../Pages/MasterCustomerVendor/index")
);

const AddBillHead = React.lazy(
  () => import("../Pages/MasterBillHead/AddBillHead")
);
const BillHeadList = React.lazy(() => import("../Pages/MasterBillHead/index"));

const AddCommodity = React.lazy(
  () => import("../Pages/MasterCommodity/AddCommodity")
);
const CommodityList = React.lazy(
  () => import("../Pages/MasterCommodity/index")
);

const AddSeaPorts = React.lazy(
  () => import("../Pages/MasterSeaPorts/AddSeaPorts")
);
const SeaPortsList = React.lazy(() => import("../Pages/MasterSeaPorts/index"));

const AddBooking = React.lazy(() => import("../Pages/Booking/AddBooking"));
const AddContainer = React.lazy(() => import("../Pages/Booking/AddContainer"));
const AddSellRate = React.lazy(() => import("../Pages/Booking/AddSellRate"));
const AddBuyRate = React.lazy(() => import("../Pages/Booking/AddBuyRate"));
const AddVesselSchedule = React.lazy(
  () => import("../Pages/Booking/AddVesselSchedule")
);
const AddEvents = React.lazy(() => import("../Pages/Booking/AddEvent"));

const BookingList = React.lazy(() => import("../Pages/Booking/index"));
const InvoiceList = React.lazy(() => import("../Pages/Invoice/index"));
const CreateInvoice = React.lazy(
  () => import("../Pages/Invoice/CreateInvoice")
);

const AddGST = React.lazy(() => import("../Pages/GST/AddGST"));
const GSTList = React.lazy(() => import("../Pages/GST/index"));

const MainRouter = () => (
  <Suspense fallback={<div>Loading...</div>}>
    {/* <Offline>
      <OfflinePage />
    </Offline> */}
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <DashboardPage />
          </Layout>
        }
      />

      <Route
        path="/master/customervendor"
        element={
          <Layout>
            <CustomerVendorList />
          </Layout>
        }
      />
      <Route
        path="/master/addcustomervendor"
        element={
          <Layout>
            <AddCustomerVendor />
          </Layout>
        }
      />

      <Route
        path="/master/billhead"
        element={
          <Layout>
            <BillHeadList />
          </Layout>
        }
      />

      <Route
        path="/master/addbillhead"
        element={
          <Layout>
            <AddBillHead />
          </Layout>
        }
      />

      <Route
        path="/master/seaports"
        element={
          <Layout>
            <SeaPortsList />
          </Layout>
        }
      />

      <Route
        path="/master/addseaports"
        element={
          <Layout>
            <AddSeaPorts />
          </Layout>
        }
      />

      <Route
        path="/booking"
        element={
          <Layout>
            <BookingList />
          </Layout>
        }
      />

      <Route
        path="/addbooking"
        element={
          <Layout>
            <AddBooking />
          </Layout>
        }
      />

      <Route
        path="/addcontainer"
        element={
          <Layout>
            <AddContainer />
          </Layout>
        }
      />

      <Route
        path="/addsellrate"
        element={
          <Layout>
            <AddSellRate />
          </Layout>
        }
      />

      <Route
        path="/addbuyrate"
        element={
          <Layout>
            <AddBuyRate />
          </Layout>
        }
      />

      <Route
        path="/addvesselschedule"
        element={
          <Layout>
            <AddVesselSchedule />
          </Layout>
        }
      />

      <Route
        path="/addevents"
        element={
          <Layout>
            <AddEvents />
          </Layout>
        }
      />

      <Route
        path="/master/commodity"
        element={
          <Layout>
            <CommodityList />
          </Layout>
        }
      />

      <Route
        path="/master/addcommodity"
        element={
          <Layout>
            <AddCommodity />
          </Layout>
        }
      />

      <Route
        path="/invoice"
        element={
          <Layout>
            <InvoiceList />
          </Layout>
        }
      />

      <Route
        path="/createinvoice"
        element={
          <Layout>
            <CreateInvoice />
          </Layout>
        }
      />

      <Route
        path="/gst"
        element={
          <Layout>
            <GSTList />
          </Layout>
        }
      />
      <Route
        path="/gst/addgst"
        element={
          <Layout>
            <AddGST />
          </Layout>
        }
      />

      {/* Error Pages */}

      <Route path="/browser" element={<BrowserPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/server-error" element={<InternalServerPage />} />
      <Route path="/*" element={<UrlNotFoundPage />} />

      {/* <Route  path="/*" render={() => <UrlNotFoundPage />} {...props} /> */}
    </Routes>
  </Suspense>
);

export default MainRouter;
