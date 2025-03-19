import React from "react";
import { useUser } from "../context/AuthContext/userContext";
import { auth } from "../firebase/firebase";
import { Container, Paper, Avatar, Typography, Button , Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Profile = () => {
  const { user } = useUser();
  console.log(user);

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "start" }}>
        Profile
      </Typography>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        {user ? (
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              textAlign: "center",
              borderRadius: 3,
            }}
          >
            <Avatar
              src={user.photoURL}
              alt="Profile"
              sx={{
                width: 80,
                height: 80,
                margin: "auto",
                border: "3px solid #1976D2",
              }}
            />
            <Typography variant="body1" color={"text.secondary"} sx={{ mt: 2 }}>
              {user.uid}
            </Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
              {user.displayName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user.email}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Height {user.height}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user.age}
            </Typography>
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleSignOut}
              sx={{ mt: 3 }}
            >
              Sign Out
            </Button>
          </Paper>
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
