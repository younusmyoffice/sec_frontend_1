import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import { Provider } from "react-redux";
import App from "./App";
import configStore from "./store/configureStore";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";

const store = configStore();

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    reportWebVitals,
);

serviceWorker.register();
