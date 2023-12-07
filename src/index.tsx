import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

import { App } from "@/App.tsx";
import "@/index.css";
import store from "@/store";

const theme = createTheme({ fontFamily: "Roboto, sans-serif" });

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <MantineProvider theme={theme}>
                <Provider store={store}>
                    <Notifications />
                    <App />
                </Provider>
            </MantineProvider>
        </BrowserRouter>
    </React.StrictMode>
);
