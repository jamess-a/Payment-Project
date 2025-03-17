import React, { useState } from "react";
import { Box, Typography, Menu, MenuItem, Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Swal from "sweetalert2";
import { patchRequest } from "../../utils/requestUtil";

const statusColors = {
  pending: "#FFA500",
  approved: "#4CAF50",
  declined: "#F44336",
  processing: "#9C27B0",
  default: "#808080",
};

const statuses = ["approved", "declined", "processing"];

const StatusBadge = ({ status_id, currentStatus, fetchTransactions }) => {
  const [status, setStatus] = useState(currentStatus || "pending");
  const [anchorEl, setAnchorEl] = useState(null);
  const statusColor =
    statusColors[status?.toLowerCase()] || statusColors.default;

  const handleClick = (event) => {
    if (status === "pending") {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editStatus = async (newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You will change the status to ${newStatus}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, change it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await patchRequest(
            `/transaction/changeStatus/${status_id}`,
            {
              status: newStatus,
            }
          );
          if (response.success) {
            setStatus(newStatus);
            Swal.fire("Success!", "Status updated successfully.", "success");
            fetchTransactions();
          }
        } catch (error) {
          console.error("Error updating status", error);
          Swal.fire("Error!", "Unable to update status.", "error");
        }
      }
    });

    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: statusColor,
          padding: "5px 10px",
          borderRadius: "12px",
          width: "fit-content",
          cursor: status === "pending" ? "pointer" : "default",
          marginTop: "2px",
          display: "flex",
          alignItems: "center", 
        }}
        onClick={handleClick}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {status}
        </Typography>
        {status === "pending" && (
          <ArrowDropDownIcon
            sx={{ color: "#fff", fontSize: "18px", marginLeft: "5px" }}
          />
        )}
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {statuses.map((s) => (
          <MenuItem key={s} onClick={() => editStatus(s)}>
            {s}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default StatusBadge;
