import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import BackButton from "../component/common/BackButton";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=10");
      const data = await response.json();
      setUsers(data.results);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching users", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <BackButton />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {users.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  padding: 3,
                  display: "flex",
                  alignItems: "center",
                  boxShadow: 3,
                }}
              >
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Avatar
                    src={user.picture.large}
                    alt={`${user.name.first} ${user.name.last}`}
                    sx={{ width: 80, height: 80, marginRight: 2 }}
                  />
                )}
                <Box>
                  <Typography variant="h6">
                    {`${user.name.first} ${user.name.last}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.location.city}, {user.location.state}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
