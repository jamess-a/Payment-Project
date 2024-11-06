import React, { useState } from "react";
import Card from "@mui/material/Card";
import { Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import generatePayload from "promptpay-qr";
import qrcode from "qrcode";
import QRLogo from "../assets/thai_qr_payment.png";

export default function QrCodeComponent() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const [SnackbarOpen, setSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const generateQrCode = async () => {
    if (!number) {
      setSnackbarOpen(true);
      setError("Please enter a mobile number or ID card number");
      return;
    }

    if (amount < 0) {
      setSnackbarOpen(true);
      setError("Please enter a valid amount");
      return;
    }
    console.log(number, amount);

    if (number.toString().length === 10 || number.toString().length === 13) {
      try {
        const payload = generatePayload(number, {
          amount: parseFloat(amount) || 0,
        });
        const svg = await qrcode.toString(payload, {
          type: "svg",
          color: { dark: "#000", light: "#fff" },
        });
        setQrCode(svg);
        setSuccessSnackbarOpen(true);
      } catch (err) {
        console.error("Error generating QR code", err);
      }
    } else {
      setSnackbarOpen(true);
      setError("Wrong mobile number or ID card number format");
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
          onChange={(e) => setNumber(e.target.value)}
          fullWidth
          margin="normal"
          required={true}
        />

        <TextField
          label="Amount (optional)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="normal"
          required={true}
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
            <div style={{ marginTop: 20 , border: "5px solid #ccc" }}>
              <img src={QRLogo} alt="PromptPay Logo" width={270} />
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
