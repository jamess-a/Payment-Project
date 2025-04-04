import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const UploadButton = ({ handleFileUpload }) => {
  return (
    <div>
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          accept="image/*"
          onChange={handleFileUpload} 
        />
        <Fab color="primary" size="small" component="span" aria-label="add">
          <AddIcon />
        </Fab>
      </label>
    </div>
  );
};

export default UploadButton;
