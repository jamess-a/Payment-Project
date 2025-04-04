import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";

const CancelIcons = ({ onClick }) => {
  return (
    <div>
      <CancelIcon
        onClick={onClick}
        sx={{
          cursor: "pointer",
          color: "red",
          transition: "0.3s",
          "&:hover": {
            color: "darkred", 
            transform: "scale(1.2)", 
          },
        }}
      />
    </div>
  );
};

export default CancelIcons;
