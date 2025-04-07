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
import { useUser } from "../context/AuthContext/userContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import checkPermissions from "../utils/checkPermissions";

const Transactions = () => {
  const user = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.user.role) {
      const hasPermission = checkPermissions(
        ["Staff", "Product"],
        user.user.role
      );
      if (!hasPermission) {
        Swal.fire({
          title: "Access Denied",
          text: "You don't have permission to access this page",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
      }
    }
  }, [user, navigate]);

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
