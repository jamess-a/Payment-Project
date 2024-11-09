import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material"; // เพิ่ม CircularProgress
import BackButton from "../component/BackButton";

const Dashboard = () => {
  const [users, setUsers] = useState([]); // แก้ไขให้เป็น Array ของ users
  const [loading, setLoading] = useState(true); // สถานะการโหลดข้อมูล

  // ดึงข้อมูลจาก API
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=10"); // เพิ่ม query parameters เพื่อดึง 10 คน
      const data = await response.json();
      setUsers(data.results); // กำหนด users ให้เป็น array ของผู้ใช้
      setLoading(false); // เปลี่ยนสถานะเป็นไม่โหลดเมื่อข้อมูลโหลดเสร็จ
    } catch (error) {
      console.log("Error fetching users", error);
      setLoading(false); // กำหนดสถานะเป็นไม่โหลดเมื่อเกิดข้อผิดพลาด
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

      {/* แสดง CircularProgress เมื่อกำลังโหลดข้อมูล */}
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
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                  boxShadow: 3,
                }}
              >
                <Avatar
                  src={user.picture.large}
                  alt={`${user.name.first} ${user.name.last}`}
                  sx={{ width: 80, height: 80, marginRight: 2 }}
                />
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
