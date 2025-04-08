import React, { useState } from "react";
import UploadButton from "./UploadButton";
import CancelIcons from "../../common/CancelIcons";
import {
  Typography,
  Box,
  Container,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import Swal from "sweetalert2";
import { set } from "date-fns";

const ImportCard = ({ isImported, setIsImported, setMock }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const dataMock = {
    payer: "นาย พัฒนศิลป์ ปลุกเศก",
    payee: "นางสาว สุปรียา ปลุกเศก",
    amount: "100.00",
    ref1: "TH29VHZZQN6U",
    payeeBank: "Scb",
    payerBank: "Kbank",
  };

  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
      setIsImported(true);
      setMock(dataMock);
      setSuccessSnackbarOpen(true);
    }
  };

  const handleRemove = () => {
    setSelectedImage(null);
    setIsImported(false);
    setMock({});
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: "500px", md: "700px", lg: "800px" },
              borderRadius: 3,
              minHeight: { xs: "300px", sm: "500px", md: "600px" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              color: "black",
              mx: "auto",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Import your slip here
            </Typography>
            <Box>
              {selectedImage ? (
                <Typography variant="body1" gutterBottom>
                  {selectedImage.name}
                </Typography>
              ) : (
                <UploadButton handleFileUpload={handleFileUpload} />
              )}
            </Box>

            <Box
              sx={{
                mt: 2,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {selectedImage ? (
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "400px",
                  }}
                >
                  <img
                    alt="not found"
                    src={URL.createObjectURL(selectedImage)}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                      display: "block",
                    }}
                  />
                  <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                    <CancelIcons onClick={handleRemove} />
                  </Box>
                </Box>
              ) : (
                <Typography variant="h6" gutterBottom>
                  No image selected
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={successSnackbarOpen}
        onClose={() => setSuccessSnackbarOpen(false)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          import successfully
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ImportCard;
