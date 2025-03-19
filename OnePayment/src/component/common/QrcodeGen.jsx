import React, { useEffect, useState, useRef } from "react";
import QRLogo from "../../assets/thai_qr_payment.png";
import DownloadIcon from "@mui/icons-material/Download";
import { Typography, Card, Box, IconButton } from "@mui/material";
import QRCode from "qrcode";
import html2canvas from "html2canvas"; 

const QRCodeGenerator = ({ bankId, amount }) => {
  const [qrCode, setQrCode] = useState("");
  const [formattedAmount, setFormattedAmount] = useState("");
  const qrCodeRef = useRef(null); 
  const containerRef = useRef(null); 

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
    const calculatedAmount = calculateAndFormatAmount(amount, 1); 
    amount = calculatedAmount;

    try {
      if (calculatedAmount < 0) {
        setQrCode("");
        setFormattedAmount("");
      } else {
        const payload = {
          bank_id: bankId,
          amount: parseFloat(calculatedAmount) || 0,
        };

        const svg = await QRCode.toString(JSON.stringify(payload), {
          type: "svg",
          color: { dark: "#000", light: "#fff" },
        });

        setQrCode(svg);
      }
    } catch (err) {
      console.error("Error generating QR code", err);
    }
  };

  useEffect(() => {
    generateQrCode();
  }, [bankId, amount]);

  const downloadQRCode = () => {
    if (containerRef.current) {
      html2canvas(containerRef.current, { useCORS: true }).then((canvas) => {
        // แปลง canvas เป็น image URL
        const imageUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = `qr-code-${formattedAmount}-THB.png`; // ตั้งชื่อไฟล์เป็น qr-code.png
        link.click(); // คลิกเพื่อลงโหลด
      });
    }
  };

  return (
    <Card sx={{ padding: 3, textAlign: "center", boxShadow: 3 }}>
      <div ref={containerRef}>
        <img src={QRLogo} alt="PromptPay Logo" width={270} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {formattedAmount} THB
        </Typography>

        <div
          id="qr-code-container"
          ref={qrCodeRef}
          dangerouslySetInnerHTML={{ __html: qrCode }}
        />
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
          onClick={downloadQRCode}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <DownloadIcon />
          <Typography sx={{ ml: 1 }}>Download</Typography>
        </IconButton>
      </Box>
    </Card>
  );
};

export default QRCodeGenerator;
