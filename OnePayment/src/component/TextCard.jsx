import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minWidth: 200,
      }}
    >
      <CardContent sx={{ textAlign: "start" }}>
        <Typography gutterBottom sx={{ color: "black", fontSize: 20 }}>
          วิธีการรับการชําระเงินผ่าน QR Code
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          1. กรอกหมายเลขโทรศัพท์หรือหมายเลขบัตรประชาชนที่ผูกกับ promptpay
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          2. กรอกจํานวนเงินที่ต้องการชําระ
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          3. กดปุ่ม "Generate QR Code"
        </Typography>
      </CardContent>
    </Card>
  );
}
