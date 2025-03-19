import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const statusOptions = ["pending", "declined", "approved", "processing"];

const HeaderFilter = () => {
  const [status, setStatus] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [date, setDate] = useState(null);
  const [transactionRef, setTransactionRef] = useState("");

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "8px",
        borderRadius: "12px 12px 0 0",
        width: "90%",
        gap: 2,
      }}
    >
      {/* Date Picker */}
      <DatePicker
        label="Date"
        value={date}
        onChange={(newDate) => setDate(newDate)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            size="small"
            fullWidth
            sx={{ minWidth: "150px", backgroundColor: "white" }}
          />
        )}
      />
      {/* Transaction Ref Search */}
      <TextField
        label="Transaction Ref."
        variant="outlined"
        size="small"
        fullWidth
        value={transactionRef}
        onChange={(e) => setTransactionRef(e.target.value)}
        sx={{ minWidth: "200px", backgroundColor: "white" }}
        InputProps={{
          endAdornment: transactionRef && (
            <InputAdornment position="end">
              <IconButton onClick={() => setTransactionRef("")} size="small">
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {/* Dropdown Filter */}
      <TextField
        label="Status"
        variant="outlined"
        size="small"
        value={searchStatus}
        onChange={(e) => setSearchStatus(e.target.value)}
        select
        sx={{ minWidth: "150px", backgroundColor: "white" }}
        InputProps={{
          endAdornment: searchStatus && (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearchStatus("")} size="small">
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      >
        {statusOptions
          .filter((s) => s.toLowerCase().includes(searchStatus.toLowerCase()))
          .map((s) => (
            <MenuItem key={s} value={s} onClick={() => setStatus(s)}>
              {s}
            </MenuItem>
          ))}
      </TextField>

      {/* Search Icon */}
      <IconButton sx={{ backgroundColor: "#fff" }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default HeaderFilter;
