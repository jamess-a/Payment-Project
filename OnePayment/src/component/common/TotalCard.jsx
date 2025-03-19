import React from "react";
import { Card, Typography, CardContent, Grid } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const TotalCard = () => {
  const totalAmount = 12500.5; // ตัวอย่างจำนวนเงินทั้งหมด

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
          total earning
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
              ฿{totalAmount.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalCard;
