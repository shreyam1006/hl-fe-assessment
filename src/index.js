import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import store from "./app/store";
import { Provider } from "react-redux";

const theme = createTheme({
  typography: {
    fontFamily: "Helvetica, Arial, sans-serif",
    h1: { fontFamily: "Helvetica, Arial, sans-serif" },
    h2: { fontFamily: "Helvetica, Arial, sans-serif" },
    h3: { fontFamily: "Helvetica, Arial, sans-serif" },
    h4: { fontFamily: "Helvetica, Arial, sans-serif" },
    h5: { fontFamily: "Helvetica, Arial, sans-serif" },
    h6: { fontFamily: "Helvetica, Arial, sans-serif" },
    subtitle1: { fontFamily: "Helvetica, Arial, sans-serif" },
    subtitle2: { fontFamily: "Helvetica, Arial, sans-serif" },
    body1: { fontFamily: "Helvetica, Arial, sans-serif" },
    body2: { fontFamily: "Helvetica, Arial, sans-serif" },
    button: { fontFamily: "Helvetica, Arial, sans-serif" },
    caption: { fontFamily: "Helvetica, Arial, sans-serif" },
    overline: { fontFamily: "Helvetica, Arial, sans-serif" },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
