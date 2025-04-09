import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import Drawer from "./Drawer";
import { useUser } from "../../context/AuthContext/userContext";
import { auth } from "../../firebase/firebase";

function MyAppBar() {
  const { user } = useUser(); // ดึงข้อมูล user จาก Context
  const [anchorEl, setAnchorEl] = useState(null);

  // เปิด-ปิด Dropdown Menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ฟังก์ชันออกจากระบบ
  const handleSignOut = () => {
    auth.signOut();
    handleMenuClose();
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Drawer เมนูด้านข้าง */}
        {user && <Drawer />}

        {/* Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          OnePayment
        </Typography>

        {/* Avatar ของ User */}
        {user && (
          <>
            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
              <Avatar src={user.photoURL}/>
            </IconButton>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ mt: 1 }}
            >
              <MenuItem disabled>
                <Typography sx={{ fontWeight: "bold "}}>{user.role}</Typography>
              </MenuItem>
              <MenuItem disabled>
                <Typography>{user.displayName}</Typography>
              </MenuItem>
              <MenuItem disabled>
                <Typography>{user.email}</Typography>
              </MenuItem>
              <MenuItem onClick={handleSignOut} sx={{ color: "error.main" }}>
                Sign Out
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
