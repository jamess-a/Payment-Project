import React from "react";
import { Container, Typography, Box } from "@mui/material";
import QrCodeComponent from "../component/QrCode";
import AppBar from "../component/AppBar";
import BasicCard from "../component/TextCard";
import DashboardLayoutAccount from "./Dashboard";

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
        <Box sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 } }}>
          {" "}
          <BasicCard />
        </Box>
      </Container>
    </>
  );
}

export default Home;
