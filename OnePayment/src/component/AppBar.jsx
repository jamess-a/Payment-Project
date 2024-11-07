import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "./Drawer";
function MyAppBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main"  }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Drawer />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          OnePayment
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
