import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Reducers/AuthReducer";
import bookingReducer from "./Reducers/BookingReducer";
import customerVendorReducer from "./Reducers/CustomerVendorReducer";
import dashboardReducer from "./Reducers/DashboardReducer";
import gstReducer from "./Reducers/GSTReducer";
import originReducer from "./Reducers/OriginReducer";
import searchBarReducer from "./Reducers/SearchBarReducer";
import spinnerReducer from "./Reducers/SpinnerReducer";
import profitCenterReducer from "./Reducers/ProfitCenterReducer";
import fyearReducer from "./Reducers/FyearReducer";
import billHeadReducer from "./Reducers/BillHeadReducer";
import commodityReducer from "./Reducers/CommodityReducer";
import seaPortsReducer from "./Reducers/SeaPortsReducer";
import invoiceReducer from "./Reducers/InvoiceReducer";
import containerTypeReducer from "./Reducers/ContainerTypeReducer";
import basisTypeReducer from "./Reducers/BasisTypeReducer";
import currencyReducer from "./Reducers/CurrencyReducer";
import movementTypeReducer from "./Reducers/MovementTypeReducer";

const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
    searchBar: searchBarReducer.reducer,
    spinner: spinnerReducer.reducer,
    customerVendor: customerVendorReducer.reducer,
    billHead: billHeadReducer.reducer,
    booking: bookingReducer.reducer,
    dashboard: dashboardReducer.reducer,
    origin: originReducer.reducer,
    gst: gstReducer.reducer,
    profitCenter: profitCenterReducer.reducer,
    fyear: fyearReducer.reducer,
    commodity: commodityReducer.reducer,
    seaPorts: seaPortsReducer.reducer,
    invoice: invoiceReducer.reducer,
    currency: currencyReducer.reducer,
    containerType: containerTypeReducer.reducer,
    basisType: basisTypeReducer.reducer,
    movementType: movementTypeReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
