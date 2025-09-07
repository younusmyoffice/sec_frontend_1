import { createTheme } from "@mui/material/styles";
import "../static/scss/base/_variables.scss";

export const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
      },
      
    palette: {
        common: {
            black: "#1c1b1f",
            white: "#ffffff",
        },
        primary: {
            main: "#E72B4A",
        },
        secondary: {
            main: "#e95f40",
        },
        success: {
            main: "#2ad159",
        },
        error: {
            main: "#dc362e",
        },
        warning: {
            main: "#E7DF33",
        },
        text: {
            primary: "#1c1b1f",
            secondary: "#49454f",
            disabled: "#E6E1E5",
        },
        background: {
            paper: "#f2f2f7",
        },
        action: {
            hover: "#e95f40",
        },
    },
});
