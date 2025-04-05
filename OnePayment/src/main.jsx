import { StrictMode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const theme = createTheme({
  typography: {
    fontFamily: "Kanit, sans-serif",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>
);
