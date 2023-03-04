import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  isLoggedIn: boolean;
  token: string | null;
  exp: string | null;
  name: string | null;
  emailId: string | null;
  mobileNumber: number | null;
  status: any;
}

const initialState: IAuthState = {
  isLoggedIn: false,
  token: null,
  exp: null,
  name: null,
  emailId: null,
  mobileNumber: null,
  status: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = !!action.payload.token;
      state.name = action.payload.user.name;
      state.emailId = action.payload.user.emailId;
      state.mobileNumber = action.payload.user.mobileNumber;
      state.exp = action.payload.exp;
      window.localStorage.setItem(
        "auth",
        JSON.stringify({ ...action.payload })
      );
    },
    logout(state) {
      window.localStorage.removeItem("auth");
      state.token = "";
      state.isLoggedIn = false;
      state.name = null;
      state.emailId = null;
      state.mobileNumber = null;
      state.exp = null;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const authActions = authReducer.actions;

export default authReducer;
