import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import QRLogo from "../../assets/thai_qr_payment.png";
import { Typography } from "@mui/material";

const QRCodeGenerator = ({ bankId, amount }) => {
  const [qrCode, setQrCode] = useState(""); 

  useEffect(() => {
    const generateQRCode = async () => {
      const payload = amount
        ? { bank_id: bankId, amount: amount }
        : { bank_id: bankId }; 

      try {
        const svg = await QRCode.toString(JSON.stringify(payload), {
          type: "svg",
          color: { dark: "#000", light: "#fff" },
        });
        setQrCode(svg);
      } catch (error) {
        console.error("Error generating QR code", error);
      }
    };

    if (bankId) {
      generateQRCode(); 
    }
  }, [bankId, amount]);

  return (
    <>
      <img src={QRLogo} alt="PromptPay Logo" width={120} />
      <Typography variant="h15" sx={{ mt: 2 }}>
        {amount ? amount : "ไม่ระบุจำนวน"} THB
      </Typography>
      <div
        dangerouslySetInnerHTML={{
          __html: qrCode, 
        }}
      />
    </>
  );
};

export default QRCodeGenerator;
