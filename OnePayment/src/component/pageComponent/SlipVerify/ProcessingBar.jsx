import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";

const ProcessingBar = ({isImported}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Divider
          orientation="horizontal"
          sx={{
            width: 100,
            height: 2,
            bgcolor: "gray",
          }}
        />
        {isImported ? (
          <CheckCircleIcon sx={{ color: "green", fontSize: 40 }} />
        ) : (
          <BlockIcon sx={{ color: "red", fontSize: 40 }} />
        )}

        <Divider
          orientation="horizontal"
          sx={{
            width: 100,
            height: 2,
            bgcolor: "gray",
          }}
        />
      </Box>
      <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
        {isImported ? "ready to approve" : "Not ready to approve"}
      </Typography>
    </Box>
  );
};

export default ProcessingBar;
