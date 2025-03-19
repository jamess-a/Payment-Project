import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  styled,
} from "@mui/material";
import TableTransactions from "../component/common/Table";
import HeaderFilterr from "../component/common/HeaderFilter";

const Transactions = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <div>
        <Typography variant="h4" gutterBottom style={{ textAlign: "start" }}>
          Transactions
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <HeaderFilterr />
      </div>
      <div>
        <TableTransactions />
      </div>
    </Box>
  );
};

export default Transactions;
