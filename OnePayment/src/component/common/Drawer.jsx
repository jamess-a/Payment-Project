import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItemButton onClick={() => handleNavigation("/home")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItemButton>
        <Divider />
        <ListItemButton onClick={() => handleNavigation("/profile")}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItemButton>
        <Divider />
        <ListItemButton onClick={() => handleNavigation("/dashboard")}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItemButton>
        <Divider />

        <ListItemButton onClick={() => handleNavigation("/transactions")}>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary={"Transactions"} />
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <MenuIcon onClick={toggleDrawer(true)} />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
