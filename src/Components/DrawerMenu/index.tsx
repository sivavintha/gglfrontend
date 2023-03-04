import React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  AccountCircle,
  Help,
  Logout,
  ManageAccounts,
  Person,
  Settings,
  SystemUpdate,
  // Mail,
  Notifications,
  DashboardOutlined,
  LocationSearchingRounded,
  AttributionOutlined,
  GroupsOutlined,
  AccountCircleOutlined,
  AttachMoneyOutlined,
  Construction,
  Business,
  AnnouncementOutlined,
  Task,
  Paid,
  Chat,
  RssFeed,
  Announcement,
  Assessment,
  // MoreVert,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import whitelogo from "../../Assets/Images/logo.jpeg";

import { useNavigate } from "react-router";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0.75, 1),
  backgroundColor: "#ECF1FD",
  height: "72px",
  boxShadow: theme.shadows[4],
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface IDrawerMenu {
  sidemenu: any[];
  open: boolean;
  drawerClose: () => void;
  menuClick: (navigateTo: string) => void;
}

const DrawerMenu: React.FC<IDrawerMenu> = ({
  sidemenu,
  open,
  drawerClose,
  menuClick,
}) => {
  const theme = useTheme();

  return <></>; //(
  // <Drawer variant="permanent" open={open}>
  //   <DrawerHeader>
  //     <Stack
  //       direction="row"
  //       spacing={1}
  //       sx={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         height: "71px"
  //       }}
  //     >
  //       <img src={whitelogo} alt="" style={{ maxWidth: "80px" }} />
  //       <Typography
  //         variant="h6"
  //         noWrap
  //         sx={{ display: { xs: "none", sm: "block" }, color: "white" }}
  //       >
  //         GGL
  //       </Typography>
  //     </Stack>
  //     <IconButton onClick={drawerClose}>
  //       {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
  //     </IconButton>
  //   </DrawerHeader>
  //   <Divider />
  //   <List>
  //     {sidemenu &&
  //       sidemenu.length > 0 &&
  //       sidemenu.map((menu, index) => {
  //         return (
  //           <ListItem
  //             button
  //             key={menu.text}
  //             onClick={() => menuClick(menu.navigateTo)}
  //           >
  //             <ListItemIcon>{menu.icon}</ListItemIcon>
  //             <ListItemText primary={menu.text} />
  //           </ListItem>
  //         );
  //       })}
  //   </List>
  // </Drawer>
  // );
};

export default DrawerMenu;
