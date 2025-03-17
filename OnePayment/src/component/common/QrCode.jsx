import React, { useState, useRef } from "react";
import Card from "@mui/material/Card";
import {
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
  Box,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import generatePayload from "promptpay-qr";
import qrcode from "qrcode";
import QRLogo from "../../assets/thai_qr_payment.png";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { postRequest } from "../../utils/requestUtil";
import html2canvas from "html2canvas";
import { useUser } from "../../context/AuthContext/userContext";

export default function QrCodeComponent() {
  const user = useUser();

  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [formattedAmount, setFormattedAmount] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [divided, setDivied] = useState("");
  const [error, setError] = useState("");
  const [SnackbarOpen, setSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const containerRef = useRef(null); // ใช้ ref สำหรับการเข้าถึง div ที่รวมทั้งหมด

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // ตรวจสอบว่าหน้าจอเป็น Mobile หรือไม่

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
    const calculatedAmount = calculateAndFormatAmount(amount, divided);
    setAmount(calculatedAmount);

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

    if (number.toString().length !== 10 && number.toString().length !== 13) {
      setSnackbarOpen(true);
      setError("Wrong mobile number or ID card number format");
      setNumber("");
      return;
    }

    const handleTransaction = async () => {

      try {
        const requestData = {
          bank_id: number,
          divided: divided ? parseInt(divided) : null,
          amount: calculatedAmount,
          timestamp: new Date().toISOString(),
          user_uid: user.user.uid,
          status: "pending",
        };

        console.log("Request Data:", requestData);

        const response = await postRequest(
          "/transaction/QRPayment",
          requestData
        );

        await Swal.fire({
          title: "Success",
          text: "Transaction successfully completed!",
          icon: "success",
        });

        console.log("Transaction Response:", response);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text:
            error.response?.data?.message ||
            "Transaction failed. Please try again.",
          icon: "error",
        });
      }
    };

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
        handleTransaction();
      }
    } catch (err) {
      console.error("Error generating QR code", err);
    }
  };

  return (
    <Grid
      container
      direction={isMobile ? "column" : "row"}
      spacing={3}
      alignItems="center"
      justifyContent="center"
    >
      {/* ฟอร์มป้อนข้อมูล */}
      <Grid item xs={8} md={6}>
        <Card
          sx={{
            padding: 9,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
            Generate PromptPay QR Code
          </Typography>
          <Box sx={{ border: "1px solid #fff", borderRadius: 2, padding: 3 }}>
            <TextField
              label="Mobile Number or ID Card Number"
              value={number}
              onChange={handleNumberChange}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Amount (optional)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              margin="normal"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
            />

            <TextField
              label="People divided (optional)"
              type="number"
              value={divided}
              onChange={(e) => setDivied(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={generateQrCode}
              sx={{ mt: 2, width: "100%" }}
            >
              Generate QR Code
            </Button>
          </Box>
        </Card>
      </Grid>

      {/* ส่วนแสดง QR Code */}
      <AnimatePresence>
        {qrCode && (
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ padding: 3, textAlign: "center", boxShadow: 3 }}>
                <div ref={containerRef}>
                  <img src={QRLogo} alt="PromptPay Logo" width={270} />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {formattedAmount} THB
                  </Typography>
                  <div dangerouslySetInnerHTML={{ __html: qrCode }} />
                </div>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <IconButton
                    onClick={() => {
                      if (containerRef.current) {
                        html2canvas(containerRef.current, {
                          useCORS: true,
                        }).then((canvas) => {
                          const imageUrl = canvas.toDataURL("image/png");
                          const link = document.createElement("a");
                          link.href = imageUrl;
                          link.download = `qr-code-${formattedAmount}-THB.png`;
                          link.click();
                        });
                      }
                    }}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <DownloadIcon />
                    <Typography sx={{ ml: 1 }}>Download</Typography>
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      setQrCode("");
                      setAmount("");
                      setDivied("");
                      setFormattedAmount("");
                    }}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <DeleteForeverIcon />
                    <Typography sx={{ ml: 1 }}>Delete</Typography>
                  </IconButton>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        )}
      </AnimatePresence>

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
          QR code generated successfully by {user.user.displayName}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
