import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PendingIcon from "@mui/icons-material/Pending";

export default function StatusIcon({ status }) {
  const statusColors = {
    pending: "#FFA500",
    approved: "#4CAF50",
    declined: "#F44336",
    processing: "#9C27B0",
    default: "#808080",
  };

  const StatusIcons = {
    pending: (
      <PendingIcon
        sx={{ color: statusColors.pending, width: "50px", height: "auto" }}
      ></PendingIcon>
    ),
    approved: (
      <CheckCircleIcon
        sx={{ color: statusColors.approved, width: "50px", height: "auto" }}
      ></CheckCircleIcon>
    ),
    declined: (
      <BlockIcon
        sx={{ color: statusColors.declined, width: "50px", height: "auto" }}
      ></BlockIcon>
    ),
    processing: (
      <AccessTimeIcon
        sx={{ color: statusColors.processing, width: "50px", height: "auto" }}
      ></AccessTimeIcon>
    ),
    default: (
      <PendingIcon
        sx={{ color: statusColors.default, width: "50px", height: "auto" }}
      ></PendingIcon>
    ),
  };

  return (
    <div style={{ width: "50px", height: "auto", alignItems: "center" }}>
      {StatusIcons[status] || StatusIcons.default}
    </div>
  );
}
