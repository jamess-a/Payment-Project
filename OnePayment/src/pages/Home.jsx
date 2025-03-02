import React from "react";
import { Container, Typography, Box } from "@mui/material";
import QrCodeComponent from "../component/common/QrCode";

function Home() {
  return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom style={{ textAlign: "start" }}>
          QR Code Payment
        </Typography>
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              minHeight: "50vh",
              textAlign: "center",
            }}
          >
            <Box>
              <QrCodeComponent />
            </Box>
          </Box>
        </Container>
      </Box>
  );
}

export default Home;
