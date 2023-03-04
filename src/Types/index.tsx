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
  fyear: string;
  pc_code: string;
  freight: string;
  operation: string;
  shipmentType: string;
  pol: string;
  pod: string;
  finalDestination: string;
  blNo: string;
  blType: string;
  mblTerms: string;
  hblTerms: string;
  commodity: string;
  vessel: string;
  voyage: string;
  noOfPackages: string;
  grossWt: string;
  netWt: string;
  cbm: string;
  description: string;
  remarks: string;

  containers:
    | [
        {
          number: string;
          type: string;
          sealNo: string;
          grossWt: number;
          netWt: number;
          cbm: number;
        }
      ]
    | null
    | undefined;

  vesselSchedule:
    | [
        {
          legNo: string;
          vesselType: string;
          vesselName: string;
          voyage: string;
          portFrom: string;
          portTo: string;

          ETD: Date;
          ETA: Date;
          sailedDt: Date;
          arrivedDt: Date;
        }
      ]
    | null
    | undefined;

  buyRate:
    | [
        {
          narration: string;
          description: string;
          billingTo: string;
          isSupplementary: string;
          basis: string;
          qty: number;
          currency: string;
          unitRate: number;
          exrate: number;
          amount: number;
          isFinalled: boolean;
        }
      ]
    | null
    | undefined;

  sellRate:
    | [
        {
          narration: string;
          description: string;
          billingTo: string;
          isSupplementary: string;
          basis: string;
          qty: number;
          currency: string;
          unitRate: number;
          exrate: number;
          amount: number;
          isFinalled: boolean;
        }
      ]
    | null
    | undefined;

  shipper: string;
  consignee: string;
  notifier: string;
  overseasAgent: string;
  line: string;
  deliveryAgent: string;
  transporter: string;
  cha: string;
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
  bookingCount: number;
  commodityCount: number;
  invoicesCount: number;
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
