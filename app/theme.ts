"use client";

import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#005154",
    },
    secondary: blue,
  },
});

export default theme;
