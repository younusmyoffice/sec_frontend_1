import React from "react";
import "./App.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppRouter } from "./AppRouter";
import withClearCache from "./ClearCache";
import { theme } from "./config/theme";
import ErrorBoundary from "./components/ErrorBoundary";
import "./config/env"; // Load environment validation
// import './font.scss'; 

const MainApp = () => {
    return <AppRouter />;
};
  
const ClearCacheComponent = withClearCache(MainApp);

const App = () => {
    return (
        <ErrorBoundary>
            <ThemeProvider theme={theme}>
                <ClearCacheComponent />
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default App;
