import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import TableTransactions from "../component/common/Table";

const Transactions = () => {

  return (
    <Box sx={{ padding: 2 }}>
      <div>
        <Typography variant="h4" gutterBottom style={{ textAlign: "start" }}>
          Transactions
        </Typography>
        <TableTransactions />
      </div>
    </Box>
  );
};

export default Transactions;
