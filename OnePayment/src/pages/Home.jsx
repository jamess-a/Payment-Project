import React from "react";
import { Container, Typography, Box } from "@mui/material";
import QrCodeComponent from "../component/common/QrCode";
import AppBar from "../component/common/AppBar";

function Home() {
  return (
    <>
      <AppBar></AppBar>
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            textAlign: "center",
            mb: { xs: 2, sm: 0 },
          }}
        >
          <Typography sx={{ mb: 2, mt: 2 }} variant="h4" gutterBottom>
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
