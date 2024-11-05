import React, { useState } from "react";
import Card from "@mui/material/Card";
import { Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import generatePayload from "promptpay-qr";
import qrcode from "qrcode";

export default function QrCodeComponent() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [SnackbarOpen, setSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const generateQrCode = async () => {
    if (!number) {
      setSnackbarOpen(true);
      return;
    }

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
          <div
            dangerouslySetInnerHTML={{ __html: qrCode }}
            style={{ marginTop: 20, width: "100%", textAlign: "center" }}
          />
        )}
      </Card>
      <Snackbar
        open={SnackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Please fill in all the fields
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
