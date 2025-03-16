import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ onClose, color = "gray", hoverColor = "black" }) => {
  return (
    <IconButton
      onClick={onClose}
      sx={{
        color: color,
        "&:hover": { color: hoverColor },
        cursor: "pointer",
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default CloseButton;
