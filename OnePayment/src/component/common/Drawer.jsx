import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/AuthContext/userContext";
import MENU from "../../constant/menu.json";

const menuIcons = {
  HOME: <HomeIcon />,
  PROFILE: <PersonIcon />,
  DASHBOARD: <InboxIcon />,
  SLIPVERIFY: <ReceiptLongIcon />,
  TRANSACTIONS: <ReceiptIcon />,
};

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const menuItems =
    user.role === "Product"
      ? Object.entries(MENU.MENU)
      : Object.entries(MENU.MENU).filter(([key]) =>
          ["HOME", "PROFILE"].includes(key)
        );

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map(([key, label]) => (
          <React.Fragment key={key}>
            <ListItemButton
              onClick={() => handleNavigation(`/${key.toLowerCase()}`)}
            >
              <ListItemIcon>{menuIcons[key]}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
            <Divider />
          </React.Fragment>
        ))}
      </List>
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
