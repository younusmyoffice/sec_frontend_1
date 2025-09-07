import React from "react";
import "./App.scss";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouter } from "./AppRouter";
import withClearCache from "./ClearCache";
import { theme } from "./config/theme";

const MainApp = () => {
    return <AppRouter />;
};

const ClearCacheComponent = withClearCache(MainApp);

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <ClearCacheComponent />
        </ThemeProvider>
    );
};

export default App;
