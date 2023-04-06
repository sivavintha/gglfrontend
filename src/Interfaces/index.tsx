import {
  TUser,
  TCustomList,
  TCustomerVendor,
  TEvent,
  TContract,
  TDashboard,
  TOrigin,
  TGST,
  TBooking,
  TProfitCenter,
  TFyear,
  TBillHead,
  TCommodity,
  TSeaPorts,
  TInvoice,
  TContainerType,
  TBasisType,
  TCurrency,
  TMovementType
} from "../Types";

//STATE INTERFACEs
export interface ICustomerVendorState {
  customers: TCustomerVendor[];
  filteredCustomerVendors: TCustomerVendor[];
  currentCustomerVendor: TCustomerVendor | null;
  status: any;
  vendors: TCustomerVendor[];
}

export interface IBillHeadState {
  billHeads: TBillHead[];
  filteredBillHeads: TBillHead[];
  currentBillHead: TBillHead | null;
  status: any;
}

export interface IInvoiceState {
  invoices: TInvoice[];
  filteredInvoices: TInvoice[];
  currentInvoices: TInvoice | null;
  status: any;
  printInvoice: TInvoice | null;
  lastSavedRecord: TInvoice | null;
}

export interface IProfitCenterState {
  profitCenters: TProfitCenter[];
  filteredProfitCenter: TProfitCenter[];
  currentProfitCenter: TProfitCenter | null;
  status: any;
}

export interface IFyearState {
  fyears: TFyear[];
  filteredFyear: TFyear[];
  currentFyear: TFyear | null;
  status: any;
}

export interface IEventState {
  event: TEvent[];
  filteredEvent: TEvent[];
  currentEvent: TEvent | null;
  status: any;
}

export interface IBookingState {
  bookings: TBooking[];
  filteredBookings: TBooking[];
  currentBooking: TBooking | null;
  status: any;
}

export interface ICommodityState {
  commodity: TCommodity[];
  filteredCommodity: TCommodity[];
  currentCommodity: TCommodity | null;
  status: any;
}

export interface ISeaPortsState {
  seaPorts: TSeaPorts[];
  filteredSeaPorts: TSeaPorts[];
  currentSeaPort: TSeaPorts | null;
  status: any;
}

export interface IContractState {
  contracts: TContract[];
  filteredContracts: TContract[];
  currentContract: TContract | null;
  status: any;
  lastSavedRecord: TContract | null;
  printContract: TContract | null;
}

export interface ISpinnerState {
  loading: boolean;
  color?: string;
}

export interface IUserState {
  users: TUser[];
  filteredUsers: TUser[];
  currentUsers: TUser | null;
  status: any;
}

export interface IDashboardState {
  dashboard: TDashboard;
  status: any;
}

export interface IOriginState {
  origin: TOrigin[];
  filteredOrigin: TOrigin[];
  currentOrigin: TOrigin | null;
  status: any;
}

export interface IGSTState {
  gst: TGST[];
  filteredGST: TGST[];
  currentGST: TGST | null;
  status: any;
}

export interface IContainerTypeState {
  containerTypes: TContainerType[];
  filteredContainerTypes: TContainerType[];
  currentContainerTypes: TContainerType | null;
  status: any;
}

export interface IMovementTypeState {
  movementTypes: TMovementType[];
  filteredMovementTypes: TMovementType[];
  currentMovementTypes: TMovementType | null;
  status: any;
}

export interface IBasisTypeState {
  basisTypes: TBasisType[];
  filteredBasisTypes: TBasisType[];
  currentBasisTypes: TBasisType | null;
  status: any;
}

export interface ICurrencyState {
  currency: TCurrency[];
  filteredCurrency: TCurrency[];
  currentCurrency: TCurrency | null;
  status: any;
}

//COMPONENT INTERFACEs

export interface ICustomAutoComplete {
  inputLabel: string;
  onChange: (event: React.SyntheticEvent<Element, Event>, value: any) => void;
  value: any;

  id: string;
  options: any;
  defaultValue?: any;
  groupBy?: any;
  size?: any;
  multiple?: boolean;
  inputPlaceholder?: string;
  helperText?: any;
  error?: any;
  getOptionLabel?: any;
  isOptionEqualToValue?: any;
  renderOptionField?: string | null;
}

export interface ICustomBreadCrumb {
  navigateTo: string;
  firstLink: string;
  secondLink: string;
}

export interface ICustomDataTable {
  columns: any;
  rows: any;
  checkboxNeeded?: boolean;
  title?: string;
  getRowId?: any;
  height?: string;
  footer?: any;
}

export interface ICustomDialog {
  open: boolean;
  handleClose: () => void;
  title: string;
  Content: string | React.ReactNode;
  Actions?: string | React.ReactNode;
  contentText?: string | React.ReactNode;
  maxWidth?: any;
}

export interface ICustomListItem {
  icon: React.ReactNode;
  primaryText: string;
  secondaryText?: string;
  handleClick: (item: any) => void;
}

export interface ICustomList {
  items: TCustomList[];
  handleClick: (item: any) => void;
}

export interface ISearchBar {
  searchBarValue: string;
}

export interface ICustomFilter {
  filters: any[];
}

export interface IFilterOptions {
  label: string;
  value: string;
  defaultChecked?: boolean;
}

export interface IToast {
  open: boolean;
  hideDuration?: number;
  closeHandler: () => void;
  severity: any;
  message: string;
}

export interface IDialogActions {
  cancelClickHandler: () => void;
  saveClickHandler: () => void;
}

export interface ICustomCard {
  cardContent: any;
  cardActions?: any;
  containerWidth?: string;
}

export interface ICustomIcon {
  src: string;
  width?: string | number;
}
//PAGE INTERFACEs
