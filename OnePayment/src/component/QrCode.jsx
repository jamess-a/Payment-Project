import React, { useState } from "react";
import Card from "@mui/material/Card";
import {
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
  Box,
} from "@mui/material";
import generatePayload from "promptpay-qr";
import qrcode from "qrcode";
import QRLogo from "../assets/thai_qr_payment.png";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";


export default function QrCodeComponent() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [formattedAmount, setFormattedAmount] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [divided, setDivied] = useState("");
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [SnackbarOpen, setSnackbarOpen] = useState(false);
  const [SnackbarOpentext, setSnackbarTextOpen] = useState(false);
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
      setAmount(amount);
      setFormattedAmount(formattedAmount);
      return;
    }

    // ตรวจสอบความยาวของหมายเลขที่กรอก (10 หรือ 13 หลัก)
    if (number.toString().length !== 10 && number.toString().length !== 13) {
      setSnackbarOpen(true);
      setError("Wrong mobile number or ID card number format");
      setNumber("");
      return;
    }

    const handletransaction = async () => {
      try {
        const response = await axios.post("http://localhost:5000/auth/transaction", {
          bank_id: number,
          divided: divided,
          amount: calculatedAmount,
          timestamp: new Date().toISOString(),
        });
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };

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
        handletransaction();
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
          onChange={(e) => setAmount(e.target.value)}
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>{formattedAmount} THB</Typography>
              </Box>
              <div
                dangerouslySetInnerHTML={{ __html: qrCode }}
                style={{ width: "100%", textAlign: "center" }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                  <IconButton
                    sx={{}}
                    onClick={() => {
                      const blob = new Blob([qrCode], {
                        type: "image/svg+xml",
                      });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = "qr-code.svg";
                      link.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <DownloadIcon />
                    <Typography>Download</Typography>
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setSnackbarTextOpen(true);
                      setText("QR code deleted successfully");
                      setQrCode("");
                      setAmount("");
                      setDivied("");
                      setFormattedAmount("");
                    }}
                  >
                    <DeleteForeverIcon />
                    <Typography>Delete</Typography>
                  </IconButton>
                </Box>
              </Box>
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

      <Snackbar
        open={SnackbarOpentext}
        onClose={() => setSnackbarTextOpen(false)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}
