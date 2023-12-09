import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { MantineProvider, createTheme, em } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

import { App } from "@/App.tsx";
import "@/index.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

import { Api } from "./api";

const theme = createTheme({
    fontFamily: "Roboto, sans-serif",
    breakpoints: { xs: em(0), sm: em(414), md: em(768), lg: em(896), xl: em(1300) }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter basename="/simbirsoft-test-task/">
            <MantineProvider theme={theme}>
                <ApiProvider api={Api}>
                    <Notifications />
                    <App />
                </ApiProvider>
            </MantineProvider>
        </BrowserRouter>
    </React.StrictMode>
);
