import { createTheme } from "@mui/material/styles";

import { ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    nuetral: {
      main: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    nuetral?: {
      main?: string;
    };
  }
}

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#303F9F",
    },
    secondary: {
      main: "#232F3E",
    },
    info: {
      main: "#9e9e9e",
    },
    background: {
      default: "#ffffff",
    },
    warning: {
      main: "#ffb74d",
    },
    common: {
      white: "#ffffff",
    },
  },
};

const theme = createTheme(
  themeOptions
  // palette: {
  //   // //   primary: {
  //   // //     main: '#556cd6',
  //   // //   },
  //   // //   secondary: {
  //   // //     main: '#19857b',
  //   // //   },
  //   // error: {
  //   //   main: red.A400,
  //   // },
  // },
);

export default theme;
