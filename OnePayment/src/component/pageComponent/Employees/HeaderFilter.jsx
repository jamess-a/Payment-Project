import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Paper,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate, useLocation } from "react-router-dom";
import { getRequest } from "../../../utils/requestUtil";

const path = "/employees";

const HeaderFilter = ({ onSearch }) => {
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (uid) queryParams.set("uid", uid);
    if (email) queryParams.set("email", email);
    if (selectedRole) queryParams.set("role", selectedRole);

    navigate(`${path}?${queryParams.toString()}`);
    onSearch(queryParams);
  };

  const fetchUserRole = async () => {
    try {
      const response = await getRequest("/employees/masterRole");
      if (response?.data) {
        setRoleOptions(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "8px",
        borderRadius: "12px 12px 0 0",
        width: "100%",
        gap: 2,
      }}
    >
      <Grid container spacing={1} alignItems="center">
        {/* Uid */}
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <TextField
            label="Uid"
            variant="outlined"
            size="small"
            fullWidth
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            sx={{
              minWidth: "200px",
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: 28,
              },
            }}
            InputProps={{
              endAdornment: uid && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setUid("")} size="small">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {/* Email */}
        <Grid item xs={12} sm={6} md={3} lg={5}>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              minWidth: "200px",
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: 28,
              },
            }}
            InputProps={{
              endAdornment: email && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setEmail("")} size="small">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <TextField
            label="Role"
            variant="outlined"
            size="small"
            select
            fullWidth
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            sx={{
              minWidth: "200px",
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: 28,
              },
            }}
            InputProps={{
              endAdornment: selectedRole && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSelectedRole("")} size="small">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          >
            {roleOptions
              .filter((r) =>
                r.role_name.toLowerCase().includes(searchRole.toLowerCase())
              )
              .map((r) => (
                <MenuItem key={r.role_id} value={r.role_id}>
                  {r.role_name}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        {/* Role Dropdown */}

        {/* Search Button */}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <IconButton
            sx={{
              backgroundColor: "#fff",
              width: "100%",
              height: "40px",
              border: "1px solid #ccc",
              borderRadius: "28px",
            }}
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HeaderFilter;
