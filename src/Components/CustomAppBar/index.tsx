import React from "react";
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Paper,
} from "@mui/material";
import {
  AccountCircle,
  Help,
  Logout,
  ManageAccounts,
  Person,
  Settings,
  SystemUpdate,
  Notifications,
  DashboardOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import CustomPopover from "../CustomPopover";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import { authActions } from "../../Store/Reducers/AuthReducer";
import whitelogo from "../../Assets/Images/logo.jpeg";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { MAINMENU } from "../../Containers/Router/MainMenu";
import CustomMenu from "../CustomMenu";
import {
  getProfitCenter,
  getProfitCenterById,
} from "../../Store/Actions/ProfitCenterActions";
import { getFyear, getFyearById } from "../../Store/Actions/FyearActions";

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
  backgroundColor: "#303F9F",
  height: "72px",
  boxShadow: theme.shadows[4],
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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

interface ICustomAppBar {
  othermenu?: any[];
  drawerOpen?: () => void;
  open?: boolean;
}

const CustomAppBar: React.FC<ICustomAppBar> = ({ othermenu }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [sidemenu, setSideMenu] = React.useState(MAINMENU);
  const [pc, setPc] = React.useState("PC0001");
  const [fyear, setFyear] = React.useState("23");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state) => state.auth);
  const profitCenterData = useAppSelector(
    (state) => state.profitCenter.profitCenters
  );
  const fyearData = useAppSelector(
    (state) => state.fyear.fyears
  );

  React.useEffect(() => {
    dispatch(getProfitCenter(false));
    dispatch(getFyear(false))
  }, [dispatch]);

  React.useEffect(() => {
    if (pc && profitCenterData.length > 0) {
      const matchingPC = profitCenterData.filter(
        (pcdata) => pcdata.code === pc
      );
      if (matchingPC && matchingPC.length > 0) {
        const _id = matchingPC[0]._id || "0";
        dispatch(getProfitCenterById(_id));
      }
    }
  }, [pc, profitCenterData]);


  React.useEffect(() => {
    if (fyear && fyearData.length > 0) {
      const matchingFyear = fyearData.filter(
        (fyrdata) => fyrdata.suffix === fyear
      );
      if (matchingFyear && matchingFyear.length > 0) {
        const _id = matchingFyear[0]._id || "0";
        dispatch(getFyearById(_id));
      }
    }
  }, [fyear, fyearData]);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    handleMenuClose();
    navigate("/settings");
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const handleAccountClick = () => {
    handleMenuClose();
    navigate("/account");
  };

  const logoutHandler = async () => {
    dispatch(authActions.logout());
    dispatch(
      authActions.setStatus({
        statusType: "success",
        message: "Logged out successfully",
      })
    );

    navigate("/login");
  };

  const handleSideMenuClick = (navigateTo: string) => {
    navigate(navigateTo);
  };

  const handlePCChange = (event: SelectChangeEvent) => {
    setPc(event.target.value as string);
  };

  const handleFyearChange = (event: SelectChangeEvent) => {
    setFyear(event.target.value as string);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <>
      <CustomPopover
        open={isMenuOpen}
        anchorEl={anchorEl}
        id={menuId}
        handleClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleProfileClick}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleSettingsClick}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleAccountClick}>
                  <ListItemIcon>
                    <ManageAccounts />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
          <nav aria-label="secondary mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleMenuClose}>
                  <ListItemIcon>
                    <SystemUpdate />
                  </ListItemIcon>
                  <ListItemText primary="Product Updates" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleMenuClose}>
                  <ListItemIcon>
                    <Help />
                  </ListItemIcon>
                  <ListItemText primary="Help" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={logoutHandler}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </CustomPopover>
    </>
  );

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box>
      <AppBar position="fixed" color={"primary"} open={open}>
        <Toolbar>
          {!open && (
            <>
              <img src={whitelogo} alt="" style={{ maxWidth: "150px" }} />
              &nbsp;&nbsp;
              {/* <Typography
                variant="h6"
                noWrap
                sx={{ display: { xs: "none", sm: "block" }, color: "white" }}
              >
                GGL
              </Typography> */}
            </>
          )}

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginLeft: "30px",
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="row-reverse" spacing={2}>
              <Item>
                <FormControl fullWidth>
                  <InputLabel id="fyear-label">Financial Year</InputLabel>
                  <Select
                    labelId="fyear-label"
                    id="fyear"
                    value={fyear}
                    label="Financial Year"
                    onChange={handleFyearChange}
                    size={"small"}
                  >
                    <MenuItem value={"0"}>Choose Fyear</MenuItem>
                    {fyearData && fyearData.length > 0
                      ? fyearData.map((fyr) => {
                          return (
                            <MenuItem value={fyr.suffix} key={fyr._id}>
                              {fyr.fullYear}
                            </MenuItem>
                          );
                        })
                      : null}
                  </Select>
                </FormControl>
              </Item>
              <Item>
                <FormControl fullWidth>
                  <InputLabel id="pc-label">Profit Center</InputLabel>
                  <Select
                    labelId="pc-label"
                    id="pc"
                    value={pc}
                    label="Profit Center"
                    onChange={handlePCChange}
                    size={"small"}
                  >
                    <MenuItem value={"choose"}>Choose ProfitCenter</MenuItem>
                    {profitCenterData && profitCenterData.length > 0
                      ? profitCenterData.map((pc) => {
                          return (
                            <MenuItem value={pc.code} key={pc._id}>
                              {pc.profitCenterName}
                            </MenuItem>
                          );
                        })
                      : null}
                  </Select>
                </FormControl>
              </Item>
            </Stack>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <AccountCircle sx={{ width: "48px", height: "48px" }} />
              <Stack sx={{ textAlign: "right", paddingLeft: "5px" }}>
                <Typography variant="button">
                  {loggedInUser && loggedInUser.name}
                </Typography>
                <Typography variant="caption">
                  {loggedInUser && loggedInUser.emailId}
                </Typography>
              </Stack>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={whitelogo} alt="" style={{ maxWidth: "150px" }} />
            {/* <Typography
              variant="h6"
              noWrap
              sx={{ display: { xs: "none", sm: "block" }, color: "white" }}
            >
              GGL 
            </Typography>*/}
          </Stack>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "white" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidemenu &&
            sidemenu.length > 0 &&
            sidemenu.map((item, key) => {
              return <CustomMenu key={key} item={item} />;
            })}
        </List>
        <Divider />
        <List>
          {othermenu &&
            othermenu.length > 0 &&
            othermenu.map((menu, index) => {
              return (
                <ListItem
                  button
                  key={menu.text}
                  onClick={() => handleSideMenuClick(menu.navigateTo)}
                >
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.text} />
                </ListItem>
              );
            })}
        </List>
      </Drawer>

      {renderMenu}
    </Box>
  );
};

export default CustomAppBar;
