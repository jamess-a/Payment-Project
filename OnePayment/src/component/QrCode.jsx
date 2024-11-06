import React, { useState } from "react";
import Card from "@mui/material/Card";
import { Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import generatePayload from "promptpay-qr";
import qrcode from "qrcode";
import QRLogo from "../assets/thai_qr_payment.png";

export default function QrCodeComponent() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [formattedAmount, setFormattedAmount] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [divided, setDivied] = useState("");
  const [error, setError] = useState("");
  const [SnackbarOpen, setSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const handleNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNumber(value);
    } else {
      setSnackbarOpen(true);
      setError("Please enter only numeric characters for the ID card number");
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAmount(value);
    } else {
      setSnackbarOpen(true);
      setError("Please enter only numeric characters for the amount");
    }
  };

  const calculateAndFormatAmount = (amt, div) => {
    let calculatedAmount = amt;
    if (div && div !== "") {
      calculatedAmount = (amt / div).toFixed(2);
    }
    const formatted = calculatedAmount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setFormattedAmount(formatted);
    return calculatedAmount;
  };

  const generateQrCode = async () => {
    // คำนวณจำนวนเงินใหม่ถ้ามีการกรอกค่าจำนวนที่หาร
    const calculatedAmount = calculateAndFormatAmount(amount, divided);
    setAmount(calculatedAmount);

    // ตรวจสอบว่าเลขหมายหรือหมายเลขบัตรประชาชนถูกต้อง
    if (!number) {
      setSnackbarOpen(true);
      setError("Please enter a mobile number or ID card number");
      setNumber("");
      return;
    }

    if (divided < 0) {
      setSnackbarOpen(true);
      setError("Please enter a valid divisor");
      setDivied("");
      setAmount("");
      setFormattedAmount("");
      return;
    }

    // ตรวจสอบความยาวของหมายเลขที่กรอก (10 หรือ 13 หลัก)
    if (number.toString().length !== 10 && number.toString().length !== 13) {
      setSnackbarOpen(true);
      setError("Wrong mobile number or ID card number format");
      setNumber("");
      return;
    }

    // สร้าง QR Code
    try {
      if (calculatedAmount < 0) {
        setSnackbarOpen(true);
        setError("Please enter a valid amount");
        setAmount("");
        setFormattedAmount("");
        setQrCode("");

      } else {
        const payload = generatePayload(number, {
          amount: parseFloat(calculatedAmount) || 0,
        });

        const svg = await qrcode.toString(payload, {
          type: "svg",
          color: { dark: "#000", light: "#fff" },
        });
        setQrCode(svg);
        setSuccessSnackbarOpen(true);
      }
    } catch (err) {
      console.error("Error generating QR code", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Card
        sx={{
          minWidth: 275,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Generate PromptPay QR Code</Typography>

        <TextField
          label="Mobile Number or ID Card Number"
          value={number}
          onChange={handleNumberChange}
          fullWidth
          margin="normal"
          required={true}
        />

        <TextField
          label="Amount (optional)"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          fullWidth
          margin="normal"
          required={true}
        />

        <TextField
          label="People divided (optional)"
          type="number"
          value={divided}
          onChange={(e) => setDivied(e.target.value)}
          margin="none"
          required={false}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={generateQrCode}
          sx={{ marginTop: 2 }}
        >
          Generate QR Code
        </Button>

        {qrCode && (
          <>
            <div style={{ marginTop: 20, border: "5px solid #ccc" }}>
              <img src={QRLogo} alt="PromptPay Logo" width={270} />
              <Typography>{formattedAmount} THB</Typography>
              <div
                dangerouslySetInnerHTML={{ __html: qrCode }}
                style={{ width: "100%", textAlign: "center" }}
              />
            </div>
          </>
        )}
      </Card>
      <Snackbar
        open={SnackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={successSnackbarOpen}
        onClose={() => setSuccessSnackbarOpen(false)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          QR code generated successfully
        </Alert>
      </Snackbar>
    </div>
  );
}
