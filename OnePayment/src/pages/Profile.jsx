import React from "react";
import { useUser } from "../context/AuthContext/userContext";
import { auth } from "../firebase/firebase";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Button,
  Box,
  Stack,
  Grid,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountProfile from ".././component/pageComponent/Profile/account/account-profile";
import AccountProfileDetails from ".././component/pageComponent/Profile/account/account-profile-details";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useUser();

  const handleSignOut = () => {
    try {
      Swal.fire("Success", "Sign out successfully", "success");
      auth.signOut();
    } catch (error) {
      Swal.fire("Error", "Sign out failed", "error");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "start" }}>
        Profile
      </Typography>
      <Container maxWidth="lg">
        {user ? (
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth="lg">
              <Box>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6} lg={4}>
                    <AccountProfile user={user} />
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<LogoutIcon />}
                      onClick={handleSignOut}
                      sx={{ my: 3 }}
                    >
                      Sign Out
                    </Button>
                  </Grid>
                  <Grid xs={12} md={6} lg={8}>
                    <Box sx={{ px: 2 }}>
                      <AccountProfileDetails user={user} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        ) : (
          <Typography variant="h6" color="text.secondary">
            You need to log in to view your profile.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Profile;
