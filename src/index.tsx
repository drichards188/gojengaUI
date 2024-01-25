import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { unstable_createMuiStrictModeTheme } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material";
import { red } from "@mui/material/colors";
import setupInterceptors from "./setupInterceptors";

// const theme = unstable_createMuiStrictModeTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: "#BA79F7",
      light: "#DBDBDB",
      dark: "#432C59",
    },
    secondary: {
      main: "#704CB6",
      light: "#9F68D4",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
setupInterceptors(store);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
