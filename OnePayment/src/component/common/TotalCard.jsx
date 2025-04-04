import React, { useEffect, useState } from "react";
import { Card, Typography, CardContent, Grid } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { getRequest } from "../../utils/requestUtil";
import { use } from "react";
import Swal from "sweetalert2";
const TotalCard = () => {
  useEffect(() => {
    fetchTotalAmount();
  });

  const [summary, setSummary] = useState([]);

  const fetchTotalAmount = async () => {
    try {
      const response = await getRequest("/dashboard/summary");
      setSummary(response.data);
    } catch (error) {
      Swal.fire("Error!", "Unable to fetch total amount.", "error");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 15,
            marginBottom: 1,
            display: "flex",
            justifyContent: "start",
          }}
        >
          total earning 7 days later
        </Typography>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <AccountBalanceWalletIcon
              sx={{ fontSize: 30, color: "green", marginRight: 1 }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              ฿ {summary.totalAmount}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalCard;
