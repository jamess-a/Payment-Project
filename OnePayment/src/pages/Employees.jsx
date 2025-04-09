import React, { useState, useEffect } from "react";
import HeaderFilter from "../component/pageComponent/Employees/HeaderFilter";
import { Grid, Box, Typography, Divider, Snackbar, Alert } from "@mui/material";
import TableUsers from "../component/pageComponent/Employees/Table";
import { getRequest } from "../utils/requestUtil";

const Employees = () => {
  const [data, setData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const fetchUsers = async (params) => {
    try {
      const response = await getRequest(`/employees?${params.toString()}`);
      setData(response.data);
      setIsSearch(true);
      setSuccessSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setData([]);
      setIsSearch(true);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.toString()) {
      fetchUsers(query);
    }
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "start" }}>
        Employees
      </Typography>

      <Grid
        container
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Grid item xs={11} lg={11}>
          <HeaderFilter onSearch={fetchUsers} />
          {isSearch ? (
            <TableUsers data={data} />
          ) : (
            <>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ mt: 2 }}>
                  <Typography>
                    🔎 Please use filter for search employees
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ borderColor: "gray", mt: 2 }} />
            </>
          )}
        </Grid>
        <Snackbar
          open={successSnackbarOpen}
          onClose={() => setSuccessSnackbarOpen(false)}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            search employees successfully
          </Alert>
        </Snackbar>
      </Grid>
    </Box>
  );
};

export default Employees;
