import React, { useState } from "react";
import UploadButton from "./UploadButton";
import CancelIcons from "../../common/CancelIcons";
import { Paper, Typography, Box, Container } from "@mui/material";
import { set } from "date-fns";

const ImportCard = ({ isImported, setIsImported, setMock }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  console.log("state", isImported);
  const dataMock = {
    payer: "นาย พัฒนศิลป์ ปลุกเศก",
    payee: "นางสาว สุปรียา ปลุกเศก",
    amount: "100.00",
    ref1: "2022-06-01",
    payeeBank: "Scb",
    payerBank: "Kbank",
  };
  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
      setIsImported(true);
      setMock(dataMock);
    }
  };

  const handleRemove = () => {
    setSelectedImage(null);
    setIsImported(false);
    setMock({});
  };

  return (
    <Box
      maxWidth="sm"
      sx={{
        width: "100%",
        padding: 3,
        borderRadius: 3,
        height: "600px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        color: "black",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Import your slip here
      </Typography>
      {selectedImage ? (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" gutterBottom>
            {selectedImage.name}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mb: 2 }}>
          <UploadButton handleFileUpload={handleFileUpload} />
        </Box>
      )}
      <Box
        mt={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {selectedImage ? (
          <Container>
            <img
              alt="not found"
              width={"400px"}
              style={{ borderRadius: "10px" }}
              src={URL.createObjectURL(selectedImage)}
            />
            <CancelIcons onClick={handleRemove} />
          </Container>
        ) : (
          <Typography variant="h6" gutterBottom>
            No image selected
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ImportCard;
