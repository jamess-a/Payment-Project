import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import TotalCard from "../component/common/TotalCard";

const Row = {
  display: "flex",
  flexDirection: "row",
  alignSelf: "center",
  width: "100%",
  gap: "10px"
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {};

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "start" }}>
        Dashboard
      </Typography>
      <Box sx={Row}>
        <TotalCard />
        <TotalCard />
      </Box>
    </Box>
  );
};

export default Dashboard;
