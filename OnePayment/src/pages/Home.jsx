// src/components/Home.jsx
import React from "react";
import {
  Container,
  Typography,
  Box,
} from "@mui/material";
import QrCodeComponent from "../component/QrCode";
import AppBar from "../component/AppBar";

function Home() {
  return (
    <>
      <AppBar></AppBar>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            textAlign: "center",
          }}
        >
          <Typography sx={{ mb: 2 }} variant="h4" gutterBottom>
            QR Code Payment
          </Typography>
          <Box>
            <QrCodeComponent />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Home;
