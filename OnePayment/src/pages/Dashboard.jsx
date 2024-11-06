import React from "react";
import { Grid, Card, CardContent, Typography, Box, Paper } from "@mui/material";
import { styled } from "@mui/system";

const dashboardData = [
  { title: "Total Users", value: "1,200", color: "primary" },
  { title: "Revenue", value: "$50,000", color: "secondary" },
  { title: "Orders", value: "320", color: "success" },
  { title: "Active Sessions", value: "120", color: "warning" },
];

const Dashboard = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {dashboardData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ backgroundColor: item.color, height: "100%" }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  {item.title}
                </Typography>
                <Typography variant="h5" color="textPrimary">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Additional components like charts, tables, etc., can be added below */}
      <Paper sx={{ padding: 2, marginTop: 3 }}>
        <Typography variant="h6">Additional Data</Typography>
        {/* Add charts or other data visualization components */}
      </Paper>
    </Box>
  );
};

export default Dashboard;
