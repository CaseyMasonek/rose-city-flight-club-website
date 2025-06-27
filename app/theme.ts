'use client'

import { createTheme } from '@mui/material/styles';
import {red, blue} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        mode: 'dark',
        secondary: blue
    },
});

export default theme;