export type TCustomList = {
  type: string;
  id: string;
  message: string;
  icon: any;
  user: string;
  data?: any;
  secondaryText?: string;
};

export type TUser = {
  _id?: string;
  name: string | null;
  dob: string | null;
  gender: string | null;
  emailId: string | null;
  mobileNumber: string | null;
  mobileNumberCountryCode: string | null;
  phoneNumber: string | null;
  phoneNumberCountryCode: string | null;
  imageUrl: string | null;
};

export type TKeyValue = {
  [key: string]: any;
};

export type TCustomerVendor = {
  _id?: string;
  code?: string;
  category: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  stateTin: string;
  country: string;
  zipcode: string;
  emailId: string;
  mobileNumber: string;
  geoCode: string;
  gstInNumber: string;
  profitCenter: string;

  isShipper: boolean;
  isConsignee: boolean;
  isNotifier: boolean;
  isOverseasAgent: boolean;
  isCHA: boolean;
  isLine: boolean;
  isTransporter: boolean;
  isSupplier: boolean;
  isDeliveryAgent: boolean;
  isWarehouse: boolean;
  creditDays: number;
};

export type TProfitCenter = {
  _id?: string;
  code?: string;
  profitCenterName: string;
  profitCenterShortName: string;
};

export type TContainerType = {
  _id?: string;
  type: string;
  abbr: string;
};

export type TMovementType = {
  _id?: string;
  type: string;
  abbr: string;
};

export type TBasisType = {
  _id?: string;
  name: string;
  abbr: string;
};

export type TCurrency = {
  _id?: string;
  name: string;
  abbr: string;
};

export type TFyear = {
  _id?: string;
  prefix: string;
  suffix: string;
  fullYear: string;
  startDt: Date;
  endDt: Date;
};

export type TBillHead = {
  _id?: string;
  code?: string;
  billHeadName: string;
  sac: string;
  gstApplicable: boolean;
  gstSlab: any;
};

export type TCommodity = {
  _id?: string;
  code?: string;
  commodityName: string;
};

export type TSeaPorts = {
  _id?: string;

  portCode: string;
  portName: string;
};

export type TEvent = {
  _id?: string;
  booking: string;
  productionPlannedDt: Date;
  productionActualDt: Date;
  containerBookingPlannedDt: Date;
  containerBookingActualDt: Date;
  doReleasePlannedDt: Date;
  doRelaseActualDt: Date;
  containerCollectionPlannedDt: Date;
  containerCollectionActualDt: Date;
  containerStuffingPlannedDt: Date;
  containerStuffingActualDt: Date;
  containerDispatchPlannedDt: Date;
  containerDispatchActualDt: Date;
  containerArrivalOriginPlannedDt: Date;
  containerArrivalOriginActualDt: Date;
  containerLoadingVesselPlannedDt: Date;
  containerLoadingVesselActualDt: Date;
  originETDPlannedDt: Date;
  originETDActualDt: Date;
  arrivalTranshipmentPort1PlannedDt: Date;
  arrivalTranshipmentPort1ActualDt: Date;
  departureTranshipmentPort1PlannedDt: Date;
  departureTranshipmentPort1ActualDt: Date;
  arrivalTranshipmentPort2PlannedDt: Date;
  arrivalTranshipmentPort2ActualDt: Date;
  departureTranshipmentPort2PlannedDt: Date;
  departureTranshipmentPort2ActualDt: Date;
  arrivalTranshipmentPort3PlannedDt: Date;
  arrivalTranshipmentPort3ActualDt: Date;
  departureTranshipmentPort3PlannedDt: Date;
  departureTranshipmentPort3ActualDt: Date;
  destinationETAPlannedDt: Date;
  destinationETAActualDt: Date;

  containerUnLoadingVesselPlannedDt: Date;
  containerUnLoadingVesselActualDt: Date;
  containerScanPlannedDt: Date;
  containerScanVesselActualDt: Date;
  containerReleaseVesselPlannedDt: Date;
  containerReleaseVesselActualDt: Date;
  containerPickupPlannedDt: Date;
  containerPickupActualDt: Date;
  containerDeliveryPlannedDt: Date;
  containerDeliveryActualDt: Date;
  containerReturnPlannedDt: Date;
  containerReturnActualDt: Date;
};

export type TBooking = {
  _id?: string;
  bookingNo: string;
  fyear: any;
  pc_code: any;
  freight: string;
  operation: string;
  shipmentType: string;
  pol: any;
  pod: any;
  finalDestination: string;
  blNo: string;
  blType: string;
  mblTerms: string;
  hblTerms: string;
  commodity: any;
  vessel: string;
  voyage: string;
  noOfPackages: string;
  grossWt: string;
  netWt: string;
  cbm: string;
  description: string;
  remarks: string;
  ourRefNo: string;
  exrate: string;

  containers: {
    containerNo: string;
    containerType: any;
    sealNo: string;
    noOfPackages: number;
    grossWt: number;
    netWt: number;
    cbm: number;
  }[];

  vesselSchedule: {
    legNo: string;
    vesselType: any;
    vesselName: string;
    voyage: string;
    portFrom: any;
    portTo: any;

    ETD: Date;
    ETA: Date;
    sailedDt: Date;
    arrivedDt: Date;
  }[];

  buyRate: {
    narration: string;
    description: string;
    billingTo: any;
    isSupplementary?: boolean;
    basis: any;
    qty: any;
    currency: any;
    unitRate: any;
    exrate: any;
    amount: any;
    isFinalled?: boolean;
  }[];

  sellRate: {
    narration: string;
    description: string;
    billingTo: any;
    isSupplementary?: boolean;
    basis: any;
    qty: any;
    currency: any;
    unitRate: any;
    exrate: any;
    amount: any;
    isFinalled?: boolean;
  }[];

  events: {
    productionPlannedDt: any;
    productionActualDt: any;
    containerBookingPlannedDt: any;
    containerBookingActualDt: any;
    doReleasePlannedDt: any;
    doReleaseActualDt: any;
    containerCollectionPlannedDt: any;
    containerCollectionActualDt: any;
    containerStuffingPlannedDt: any;
    containerStuffingActualDt: any;
    containerDispatchPlannedDt: any;
    containerDispatchActualDt: any;
    containerArrivalPlannedDt: any;
    containerArrivalActualDt: any;
    containerLoadingPlannedDt: any;
    containerLoadingActualDt: any;
    originETDPlannedDt: any;
    originETDActualDt: any;
    port1ArrivalPlannedDT: any;
    port1ArrivalActualDT: any;
    port1DeparturePlannedDt: any;
    Port1DepartureActualDT: any;
    port2ArrivalPlannedDT: any;
    port2ArrivalActualDT: any;
    port2DeparturePlannedDt: any;
    Port2DepartureActualDT: any;
    port3ArrivalPlannedDT: any;
    port3ArrivalActualDT: any;
    port3DeparturePlannedDt: any;
    Port3DepartureActualDT: any;
    destinationETAPlannedDt: any;
    destinationETAActualDt: any;
    containerUnloadingPlannedDT: any;
    containerUnloadingActualDt: any;
    containerScanPlnnedDt: any;
    containerScanActualDt: any;
    containerRelasePlannedDt: any;
    containerRelaseActualDt: any;
    containerPickupPlannedDt: any;
    containerPickupActualDt: any;
    containerDeliveryPlannedDt: any;
    containerDeliveryActualDt: any;
    containerReturnPlannedDt: any;
    containerReturnActualDt: any;
  };

  shipper: any;
  consignee: any;
  notifier: any;
  overseasAgent: any;
  line: any;
  deliveryAgent: any;
  transporter: any;
  CHA: any;
};

export type TInvoice = {
  _id?: string;
  invoiceNo?: string;
  fyear: any;
  pc_code: any;
  invoiceCategory: string;
  billingTo: string;
  bookingNo: any;
  billingParty: any;
  invoiceDate: Date;
  isFinalled: boolean;
  cancelledBy: any;
  isCancelled: boolean;
  cancelledAt: Date;
};

export type TContract = {
  _id?: string;
  code?: string;
  buyer: any;
  seller: any;
  commodity: any;
  origin: any;
  outTurn: string;
  nutCount: string;
  moisture: string;
  quantity: string;
  packing: string;
  rate: string;
  paymentTerms: string;
  shipmentAdvice: string;
  accountDetails: any;
  remarks: string;
  isFinal: boolean;
  cargoLocation: string;
};

export type TDashboard = {
  customerCount: number;
  vendorCount: number;
  bookingsCount: number;
  commodityCount: number;
  invoiceCount: number;
};

export type TOrigin = {
  _id?: string;
  code?: string;
  originName: string;
};

export type TGST = {
  _id?: string;
  gst: number;
  igst: number;
  cgst: number;
  sgst: number;
  effectiveFrom: any;
  effectiveTo: any;
};
