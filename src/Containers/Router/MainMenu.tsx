import {
  AccountBalance,
  AttachMoney,
  DashboardOutlined,
  EventAvailable,
  Gavel,
  LocalOffer,
  LocationCity,
  People,
  Percent,
  PriceChange,
  Star,
  WebAsset,
  Handshake,
  Inventory,
  Note,
} from "@mui/icons-material";
import CustomIcon from "../../Components/CustomIcon";
import cashew from "../../Assets/icons/cashew.png";

export const MAINMENU = [
  {
    icon: <DashboardOutlined />,
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: <WebAsset />,
    title: "Master",
    items: [
      {
        icon: <People />,
        title: "Customer / Vendor",
        to: "/master/customervendor",
      },

      {
        icon: <PriceChange />,
        title: "Bill Heads",
        to: "/master/billhead",
      },
      {
        icon: <CustomIcon src={cashew} width="24px" />,
        title: "Commodity",
        to: "/master/commodity",
      },
      {
        icon: <LocationCity />,
        title: "Sea Ports",
        to: "/master/seaports",
      },
      {
        icon: <Percent />,
        title: "GST",
        to: "/gst",
      },
    ],
  },
  {
    icon: <Handshake />,
    title: "Booking",
    to: "/booking",
  },
  // {
  //   icon: <EventAvailable />,
  //   title: "Events",
  //   to: "/events",
  // },
  {
    icon: <Note />,
    title: "Invoice",
    to: "/invoice",
  },
  // {
  //   icon: <Gavel />,
  //   title: "Contracts",
  //   to: "/contract",
  // },
];
