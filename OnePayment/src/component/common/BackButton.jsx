import React from "react";
import { Button , Box } from "@mui/material";


export default function BackButton() {
  return (
    <Box sx={{ mb : 2}}> 
      <Button variant="contained" onClick={() => window.history.back()}>
        Back
      </Button>
    </Box>
  );
}
