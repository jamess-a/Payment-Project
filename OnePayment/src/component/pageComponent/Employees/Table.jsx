import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

const ColumnStyle = {
  borderRight: "1px solid #ccc",
  borderTop: "1px solid #ccc",
  borderleft: "1px solid #ccc",
};

const TableUsers = ({ data }) => {
  const [loading, setLoading] = useState(true); // เริ่มต้นที่การโหลด
  const admins = data;

  // ใช้ useEffect เพื่อตั้งค่าการโหลดเป็น false เมื่อข้อมูลเข้ามา
  useEffect(() => {
    if (data && data.length > 0) {
      setLoading(false); // เมื่อข้อมูลมาถึง ตั้งค่า loading เป็น false
    }
  }, [data]); // ใช้ data เป็น dependency

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        padding: "8px",
        mx: "auto",
        borderRadius: "0px 0px 12px 12px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...ColumnStyle, width: "20px" }}>id</TableCell>
            <TableCell sx={{...ColumnStyle, width: "150px"}}>Username</TableCell>
            <TableCell sx={{...ColumnStyle, width: "150px"}}>Email</TableCell>
            <TableCell sx={{...ColumnStyle, width: "50px"}}>Age</TableCell>
            <TableCell sx={{...ColumnStyle, width: "50px"}}>Height</TableCell>
            <TableCell sx={{ ...ColumnStyle, width: "100px" }}>Phone</TableCell>
            <TableCell sx={{ ...ColumnStyle, width: "50px" }}>Uid</TableCell>
            <TableCell sx={{ ...ColumnStyle, width: "60px" }}>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            textAlign: "center",
            width: "100%",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                {" "}
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : admins && admins.length > 0 ? (
            admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell sx={ColumnStyle}>{admin.id}</TableCell>
                <TableCell sx={ColumnStyle}>{admin.username}</TableCell>
                <TableCell sx={ColumnStyle}>{admin.email}</TableCell>
                <TableCell sx={ColumnStyle}>{admin.age}</TableCell>
                <TableCell sx={ColumnStyle}>{admin.height}</TableCell>
                <TableCell sx={ColumnStyle}>{admin.phone}</TableCell>
                <TableCell sx={ColumnStyle}>{admin.uid}</TableCell>
                <TableCell sx={ColumnStyle}>{admin.role_name}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No Users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableUsers;
