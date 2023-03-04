import * as React from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  CssBaseline,
  Paper,
} from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import logo from "../../../Assets/Images/logo.jpeg";

import bg from "../../../Assets/Images/bg.png";
import Copyright from "../../../Components/Copyright";
import { authActions } from "../../../Store/Reducers/AuthReducer";
import { useSnackbar } from "notistack";
import { loginUser } from "../../../Store/Actions/AuthActions";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    if (auth.token) {
      if (auth.status.type === "success") {
        navigate("/dashboard");
      }
    }
    if (auth.status) {
      enqueueSnackbar(auth.status.message, { variant: auth.status.type });
    }
  }, [auth.status, enqueueSnackbar, navigate]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const emailId = data.get("email");
    const password = data.get("password");

    if (!emailId) {
      enqueueSnackbar("Invalid Email", { variant: "error" });
      return;
    }

    if (!password) {
      enqueueSnackbar("Invalid Password", { variant: "error" });
      return;
    }

    try {
      dispatch(loginUser({ emailId, password }));
    } catch (error) {
      dispatch(
        authActions.setStatus({
          statusType: "error",
          message: "login attempt failed! please try again.",
        })
      );
      enqueueSnackbar("Error while login...", { variant: "error" });
    }
    // navigate("/dashboard");
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={9}
        container
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid item md={12} sx={{ textAlign: "center" }}>
          <Box
            sx={{
              position: "absolute",
              bottom: "0",
              left: "30%",
            }}
          >
            <Copyright />
          </Box>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={3}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          backgroundColor: "#f7f7f7",
        }}
      >
        <Box>
          <img src={logo} alt="" style={{ width: "300px" }} />
        </Box>
        <Box
          sx={{
            height: "100%",
          }}
        >
          <Box
            sx={{
              mx: 4,
              my: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "start",
                width: "100%",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlined />
              </Avatar>
              <Typography component="h1" variant="h6">
                SIGN IN
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="EMAIL ADDRESS"
                name="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{ className: "input-label" }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="PASSWORD"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputLabelProps={{ className: "input-label" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Box>
        <Copyright />
      </Grid>
    </Grid>
  );
};

export default Login;
